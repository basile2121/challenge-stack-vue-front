<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="calculator-title text-h3">Calculateur de calories</div>
      <v-form>
        <v-responsive class="align-center text-center fill-height calculator-input-file-v-responsive">
          <v-file-input
            v-model="files"
            label="Déposez votre recette ici..."
            placeholder="Upload your documents"
            variant="solo-filled"
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-chip
                  class="me-2"
                  color="primary"
                  size="small"
                >
                  {{ fileName }}
                </v-chip>
              </template>
            </template>
          </v-file-input>
        </v-responsive>

        <v-row align="center" class="calculator-bouttons" justify="center">
          <v-col cols="auto">
            <v-btn color="success" elevation="4" rounded="sm" size="large" @click="handleImportRecipe('save')">
              Enregistrer
              <v-tooltip
                activator="parent"
                location="top"
              >Enregistrer le recette importée
              </v-tooltip>
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn color="primary" elevation="4" rounded="sm" size="large" @click="handleImportRecipe('analyse')">
              Analyser
              <v-tooltip
                activator="parent"
                location="top"
              >Lancer l'analyse de la recette importée
              </v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-responsive v-if="displayAnalyseResult" class="align-center text-center fill-height">
        <v-card class="mx-auto calculator-rapport-card" max-width="600"
                variant="outlined">
          <template v-slot:title>
            Rapport d'analyse
          </template>

          <div class="d-flex justify-center">
            <h4>Calories <span style="color: red;">{{ analyzeRecipe.totalCalorique }} kcal</span></h4>
            <v-icon color="red" icon="mdi-fire"/>
          </div>

          <v-divider class="my-3 mx-lg-16"></v-divider>

          <h4>Macro nutriments</h4>

          <div class="my-3 d-flex justify-center">
            <div>Proteins - <span style="color: brown;">{{ analyzeRecipe.totalProtein }} g</span></div>
            <v-icon color="brown" icon="mdi-food-drumstick"/>
          </div>

          <div class="my-3 d-flex justify-center">
            <div>Glucide - <span style="color: blue;">{{ analyzeRecipe.totalGlucide }} g</span></div>
            <v-icon color="blue" icon="mdi-spoon-sugar"/>
          </div>

          <div class="my-3 d-flex justify-center">
            <div>Lipide - <span style="color: yellowgreen;">{{ analyzeRecipe.totalLipide }} g</span></div>
            <v-icon color="yellow" icon="mdi-water"/>
          </div>

        </v-card>

        <div class="calculator-rapport-export-buttons my-3">
          <v-btn color="blue" @click="exportFile('application/json','export.json')">
            <v-icon icon="mdi-code-json" size="x-large"/>
            <v-tooltip
              activator="parent"
              location="top"
            >Exporter le rapport d'analyse au format JSON
            </v-tooltip>
          </v-btn>
          <v-btn color="green" @click="exportFile('data:text/csv;charset=utf-8,', 'export.json')">
            <v-icon icon="mdi-file-excel" size="x-large"/>
            <v-tooltip
              activator="parent"
              location="top"
            >Exporter le rapport d'analyse au format CSV
            </v-tooltip>
          </v-btn>
        </div>

      </v-responsive>
      <v-btn class="mt-2" color="primary" elevation="4" rounded="sm" size="large" @click="generateRandomRecipe()">
        Recette aléatoire
        <v-tooltip
          activator="parent"
          location="top"
        >Générer une recette aléatoire
        </v-tooltip>
      </v-btn>
      <div class="text-center ma-2">
        <v-snackbar
          v-model="displaySnackBar"
        >
          {{ textSnackBar }}

          <template v-slot:actions>
            <v-btn
              color="white"
              variant="text"
              @click="displaySnackBar = false"
            >
              Fermer
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import {useRecipeStore} from '@/stores/recipe';

const recipeStore = useRecipeStore();
interface AnalyseRecipeResponse {
  totalCalorique: string
  totalProtein: string
  totalGlucide: string
  totalLipide: string
}

export default {
  name: 'CalculatorComponent',
  data: () => ({
    files: [],
    displayAnalyseResult: false,
    jsonResultFileImport: {},
    displaySnackBar: false,
    textSnackBar: '',
    analyzeRecipe: Object as AnalyseRecipeResponse,
  }),
  methods: {

    /**
     * Lire un fichier JSON pour retourner le JSON
     * @param file
     */
    async readFileJson(file): Promise<Object> {
      return new Promise((res, rej) => {
        let reader = new FileReader();
        reader.onload = e => {
          if (typeof e.target.result === "string") {
            res(JSON.parse(e.target.result));
          }
        };
        reader.readAsText(file);
      });
    },

    /**
     * Vérifie le type d'import du fichier et lis son contenu
     *
     * @param typeAction
     */
    async handleImportRecipe(typeAction: string) {
      if (this.files.length === 1) {
        if (this.files[0].type === 'application/json') {
          this.jsonResultFileImport = await this.readFileJson(this.files[0])
          if (typeAction === 'analyse') {
            this.analyzeRecipe = await recipeStore.analyzeRecipeObject(this.jsonResultFileImport)
            console.log(this.analyzeRecipe)
            this.handleSnackBar(typeAction)
            this.displayAnalyseResult = !this.displayAnalyseResult
          } else if (typeAction === 'save') {
            this.handleSnackBar(typeAction)
            await recipeStore.createRecipe(this.jsonResultFileImport)
          }
        } else {
          this.handleSnackBar('fileExtension')
        }
      } else {
        this.handleSnackBar('fileMissing')
      }
    },

    /**
     * Méthode pour exporter le resultat de l'analyse
     * Le type passé en parametre correspond aux type de fichier généré
     * @param type
     * @param filename
     * @param data
     */
    exportFile(type: string, filename: string, data?: Object) {
      let url = '';
      if (data != null) {
        // Create a BLOB
        let blob = new Blob([JSON.stringify(data)], {type: type});
        url = URL.createObjectURL(blob);
      } else {
        let blob = new Blob([JSON.stringify(this.jsonResultFileImport)], {type: type});
        url = URL.createObjectURL(blob);
      }
    },

    /**
     * Manage l'affiche de la snackBar informative en fonction de l'opération type
     * Effectué par l'uttilisateur
     * @param type
     */
    handleSnackBar(type: string) {
      this.displaySnackBar = true;
      switch (type) {
        case 'save':
          this.textSnackBar = 'Enregistrement de la recette effectué avec success';
          break;
        case 'analyse':
          this.textSnackBar = 'Analyse de la recette effectuée avec success';
          break;
        case 'fileMissing':
          this.textSnackBar = 'Aucun fichier importé';
          break;
        case 'fileExtension':
          this.textSnackBar = 'Mauvais type de fichier importé';
      }
    },
    async generateRandomRecipe() {
      const recipe = await recipeStore.createRandomRecipe()

      this.exportFile('application/json', 'randomRecipe.json', recipe)
    }
  }
}
</script>

<style scoped>

:deep(.v-file-input .v-input__control) {
  height: 250px;
  text-align: center;
  vertical-align: middle;
}

:deep(.v-file-input .v-input__prepend) {
  width: 0;
  height: 0;
}

.calculator-input-file-v-responsive {
  max-width: 60%;
  min-width: 30%;
  margin: auto;
  padding: 30px 0;
}

.calculator-input-file-v-responsive {
  max-width: 40%;
  min-width: 40%;
  margin: auto;
  padding: 30px 0;
}

@media (max-width: 700px) {
  .calculator-input-file-v-responsive {
    max-width: 80%;
  }
}

.calculator-title {
  margin-top: 30px;
}

.calculator-rapport-card {
  margin-top: 30px;
}

.calculator-rapport-export-buttons button {
  margin: 0 10px;
  border-radius: 100px;
}

.calculator-rapport-export-buttons button {
  height: calc(var(--v-btn-height) + 12px);
  border-radius: 100px;
}

</style>

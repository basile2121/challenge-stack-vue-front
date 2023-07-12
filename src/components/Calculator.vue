<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="calculator-title text-h3">Calculateur de calories</div>
      <v-form>
        <v-responsive class="align-center text-center fill-height calculator-input-file-v-responsive">
          <v-file-input
            v-model="files"
            placeholder="Upload your documents"
            label="Déposez votre recette ici..."
            variant="solo-filled"
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-chip
                  size="small"
                  label
                  color="primary"
                  class="me-2"
                >
                  {{ fileName }}
                </v-chip>
              </template>
            </template>
          </v-file-input>
        </v-responsive>

        <v-row class="calculator-bouttons" align="center" justify="center">
          <v-col cols="auto">
            <v-btn @click="handleImportRecipe('save')" color="success" elevation="4" rounded="sm" size="x-large">
              Enregistrer
              <v-tooltip
                activator="parent"
                location="top"
              >Enregistrer le recette importée</v-tooltip>
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn @click="handleImportRecipe('analyse')" color="primary" elevation="4" rounded="sm" size="x-large">
              Analyser
              <v-tooltip
                activator="parent"
                location="top"
              >Lancer l'analyse de la recette importée</v-tooltip>
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
            <h4>Calories <span style="color: red;">9000</span></h4>
            <v-icon color="red" icon="mdi-fire"/>
          </div>

          <v-divider class="my-3 mx-lg-16"></v-divider>

          <h4>Macro nutriments</h4>

          <div class="my-3 d-flex justify-center">
            <div>Proteins - <span style="color: brown;">9000 g</span></div>
            <v-icon color="brown" icon="mdi-food-drumstick"/>
          </div>

          <div class="my-3 d-flex justify-center">
            <div>Glucide - <span style="color: blue;">9000 g</span></div>
            <v-icon color="blue" icon="mdi-spoon-sugar"/>
          </div>

          <div class="my-3 d-flex justify-center">
            <div>Lipide - <span style="color: yellowgreen;">9000 g</span></div>
            <v-icon color="yellow" icon="mdi-water"/>
          </div>

        </v-card>

        <div class="calculator-rapport-export-buttons my-3">
          <v-btn @click="exportFile('application/json','export.json')" color="blue">
            <v-icon size="x-large" icon="mdi-code-json"/>
            <v-tooltip
              activator="parent"
              location="top"
            >Exporter le rapport d'analyse au format JSON</v-tooltip>
          </v-btn>
          <v-btn @click="exportFile('data:text/csv;charset=utf-8,', 'export.json')" color="green">
            <v-icon size="x-large" icon="mdi-file-excel"/>
            <v-tooltip
              activator="parent"
              location="top"
            >Exporter le rapport d'analyse au format CSV</v-tooltip>
          </v-btn>
        </div>

      </v-responsive>

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
export default {
  name: 'CalculatorComponent',
  data: () => ({
    files: [],
    displayAnalyseResult: false,
    jsonResult: {},
    displaySnackBar: false,
    textSnackBar: '',
  }),
  methods: {
    /**
     * Lire un fichier JSON pour retourner le JSON
     * @param file
     */
    async readFileJson(file): Promise<Object> {
      return new Promise((res,rej)=>{
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
    async handleImportRecipe (typeAction: string) {
      if (this.files.length === 1) {
        if (this.files[0].type === 'application/json') {
          this.jsonResult = await this.readFileJson(this.files[0])
          if (typeAction === 'analyse') {
            this.handleSnackBar(typeAction)
            this.displayAnalyseResult = !this.displayAnalyseResult
          } else if (typeAction === 'save') {
            this.handleSnackBar(typeAction)
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
     */
    exportFile(type: string, filename: string) {
      // Create a BLOB
      let blob = new Blob([JSON.stringify(this.jsonResult)], { type: 'application/json' });
      let url = URL.createObjectURL(blob);

      // Create a link to download it
      let pom = document.createElement('a');
      pom.href = url;
      pom.setAttribute('download', 'export.json');
      pom.click();
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
  }
}
</script>

<style scoped>

:deep(.v-file-input .v-input__control)  {
  height: 250px;
  text-align: center;
  vertical-align: middle;
}

:deep(.v-file-input .v-input__prepend)  {
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

.calculator-rapport-export-buttons button  {
  height: calc(var(--v-btn-height) + 12px);
  border-radius: 100px;
}



</style>

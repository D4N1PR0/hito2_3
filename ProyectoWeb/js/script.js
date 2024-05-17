function loadSurveyData() {
    fetch('data/students.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Obtén los valores de los filtros
            const ageFilter = document.getElementById('age-filter').value;
            const sexFilter = document.getElementById('sex-filter').value;
            const questionFilter = document.getElementById('question-filter').value;

            // Filtrar los datos según la edad, el sexo y la pregunta seleccionadas
            let filteredData = data;
            if (ageFilter) {
                filteredData = filteredData.filter(survey => {
                    const age = survey['¿Qué edad tienes? Introduce un valor numérico.'];
                    if (ageFilter === '18-25') {
                        return age >= 18 && age <= 25;
                    } else if (ageFilter === '26-35') {
                        return age >= 26 && age <= 35;
                    } else if (ageFilter === '36-45') {
                        return age >= 36 && age <= 45;
                    } else if (ageFilter === '46-55') {
                        return age >= 46 && age <= 55;
                    } else if (ageFilter === '56-65') {
                        return age >= 56 && age <= 65;
                    } else {
                        return age >= 66;
                    }
                });
            }

            if (sexFilter) {
                filteredData = filteredData.filter(survey => survey['sexo'] === sexFilter);
            }

            if (questionFilter) {
                filteredData = filteredData.filter(survey => survey[questionFilter] !== undefined);
            }

            // Convertir los datos filtrados a una matriz para mostrar en la tabla
            const filteredDataArray = filteredData.map(survey => ({
                edad: survey['¿Qué edad tienes? Introduce un valor numérico.'],
                correo: survey['email'] // Aquí se cambia a 'email' si ese es el nombre del campo
            }));

            // Mostrar los datos filtrados en la tabla
            const resultsContainer = document.getElementById('survey-results');
            resultsContainer.innerHTML = '';
            filteredDataArray.forEach(survey => {
                const row = `<tr>
                    <td>${survey.edad}</td>
                    <td>${survey.correo}</td>
                </tr>`;
                resultsContainer.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

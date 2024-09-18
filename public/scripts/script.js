document.addEventListener("DOMContentLoaded", function () {
    const departmentSelect = document.getElementById("department");
    const townSelect = document.getElementById("town");
    const companyForm = document.getElementById("companyForm");
    const companiesTableBody = document.querySelector("tbody");
  
    let allTowns = [];
  
    fetch('/towns')
      .then(response => response.json())
      .then(data => {
        allTowns = data.towns; 
      })
      .catch(error => console.error("Error al obtener municipios:", error));
  
    departmentSelect.addEventListener("change", function () {
      const departmentCode = this.value; 
      townSelect.innerHTML = '<option value="" selected>Seleccione un municipio</option>';
  
      if (departmentCode) {
        const filteredTowns = allTowns.filter(town => town.department === departmentCode);
  
        filteredTowns.forEach((town) => {
          const option = document.createElement("option");
          option.value = town.code; 
          option.textContent = town.name;
          townSelect.appendChild(option);
        });
      }
    });
  
    companyForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const empresa = {
        nombre: document.getElementById("nombre").value.trim(),
        sector: document.getElementById("sector").value.trim(),
        identificacion: document.getElementById("identificacion").value.trim(),
        departamento: departmentSelect.options[departmentSelect.selectedIndex].text,
        municipio: townSelect.options[townSelect.selectedIndex].text,
      };
  
      if (!empresa.nombre || !empresa.sector || !empresa.identificacion || !empresa.departamento || !empresa.municipio) {
        alert('Por favor, completa todos los campos.');
        return;
      }
  
      fetch('/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(empresa)
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          agregarEmpresaATabla(empresa);
  
          companyForm.reset();
          townSelect.innerHTML = '<option value="" selected>Seleccione un municipio</option>';
        }
      })
      .catch(error => console.error('Error al registrar empresa:', error));
    });
  
    function agregarEmpresaATabla(empresa) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${empresa.nombre}</td>
        <td>${empresa.sector}</td>
        <td>${empresa.identificacion}</td>
        <td>${empresa.departamento}</td>
        <td>${empresa.municipio}</td>
      `;
      companiesTableBody.appendChild(tr);
    }
  });
  
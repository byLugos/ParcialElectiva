const companies = [];
function addCompany(nombre, sector, identificacion, departamento, municipio) {
  const newCompany = {
    nombre,
    sector,
    identificacion,
    departamento,
    municipio,
  };
  companies.push(newCompany); 
}
addCompany('Empresa XYZ', 'Tecnología', '123456789', 'Cundinamarca', 'Bogotá');
addCompany('Empresa ABC', 'Salud', '987654321', 'Antioquia', 'Medellín');


module.exports = companies;


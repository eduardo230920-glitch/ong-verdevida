

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

 
  function validarFormulario() {
    const nomeProjeto = form.nomeProjeto.value.trim();
    const categoria = form.categoria.value.trim();
    const descricao = form.descricao.value.trim();
    const impacto = form.impacto.value.trim();
    const resultados = form.resultados.value.trim();

    if (nomeProjeto.length < 3) {
      alert("O nome do projeto deve ter pelo menos 3 caracteres.");
      form.nomeProjeto.focus();
      return false;
    }

    if (!categoria) {
      alert("Selecione uma categoria para o projeto.");
      form.categoria.focus();
      return false;
    }

    if (descricao.length < 10) {
      alert("A descrição do projeto é muito curta.");
      form.descricao.focus();
      return false;
    }

    if (impacto.length < 5) {
      alert("Preencha os indicadores de impacto de forma mais detalhada.");
      form.impacto.focus();
      return false;
    }

    if (resultados.length < 5) {
      alert("Preencha os resultados alcançados de forma mais detalhada.");
      form.resultados.focus();
      return false;
    }

    return true;
  }

  
  function salvarProjeto() {
    const projeto = {
      nome: form.nomeProjeto.value.trim(),
      categoria: form.categoria.value.trim(),
      descricao: form.descricao.value.trim(),
      impacto: form.impacto.value.trim(),
      resultados: form.resultados.value.trim(),
      dataCadastro: new Date().toLocaleString()
    };

    
    const projetos = JSON.parse(localStorage.getItem("projetos")) || [];
    projetos.push(projeto);
    localStorage.setItem("projetos", JSON.stringify(projetos));

    alert(`Projeto "${projeto.nome}" cadastrado com sucesso!`);
    form.reset();
  }

  
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (validarFormulario()) {
      salvarProjeto();
    }
  });

  
  const listarProjetos = () => {
    const projetos = JSON.parse(localStorage.getItem("projetos")) || [];
    console.log("Projetos cadastrados:", projetos);
  };

  
  listarProjetos();
});

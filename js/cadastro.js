

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");

  cpf.addEventListener("input", () => {
    cpf.value = cpf.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  });

  telefone.addEventListener("input", () => {
    telefone.value = telefone.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  });

  cep.addEventListener("input", () => {
    cep.value = cep.value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{3})$/, "$1-$2");
  });

  
  function validarFormulario() {
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const nascimento = form.nascimento.value.trim();
    const endereco = form.endereco.value.trim();
    const cidade = form.cidade.value.trim();
    const estado = form.estado.value.trim();
    
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    const cepRegex = /^\d{5}-\d{3}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if(nome.length < 3){
      alert("Digite um nome válido (mínimo 3 caracteres).");
      form.nome.focus();
      return false;
    }
    if(!emailRegex.test(email)){
      alert("Digite um e-mail válido.");
      form.email.focus();
      return false;
    }
    if(!cpfRegex.test(cpf.value)){
      alert("Digite um CPF válido (000.000.000-00).");
      cpf.focus();
      return false;
    }
    if(!telefoneRegex.test(telefone.value)){
      alert("Digite um telefone válido ((00) 00000-0000).");
      telefone.focus();
      return false;
    }
    if(!nascimento){
      alert("Informe a data de nascimento.");
      form.nascimento.focus();
      return false;
    }
    if(endereco.length < 5){
      alert("Informe um endereço válido.");
      form.endereco.focus();
      return false;
    }
    if(!cepRegex.test(cep.value)){
      alert("Digite um CEP válido (00000-000).");
      cep.focus();
      return false;
    }
    if(cidade.length < 2){
      alert("Informe uma cidade válida.");
      form.cidade.focus();
      return false;
    }
    if(estado.length !== 2){
      alert("Informe a sigla do estado (UF).");
      form.estado.focus();
      return false;
    }

    return true;
  }

  
  function salvarVoluntario() {
    const voluntario = {
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      cpf: cpf.value,
      telefone: telefone.value,
      nascimento: form.nascimento.value,
      endereco: form.endereco.value.trim(),
      cep: cep.value,
      cidade: form.cidade.value.trim(),
      estado: form.estado.value.trim(),
      dataCadastro: new Date().toLocaleString()
    };

    
    const voluntarios = JSON.parse(localStorage.getItem("voluntarios")) || [];
    voluntarios.push(voluntario);
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

    alert(`Voluntário "${voluntario.nome}" cadastrado com sucesso!`);
    form.reset();
  }

  
  form.addEventListener("submit", e => {
    e.preventDefault();
    if(validarFormulario()){
      salvarVoluntario();
    }
  });

  
  const listarVoluntarios = () => {
    const voluntarios = JSON.parse(localStorage.getItem("voluntarios")) || [];
    console.log("Voluntários cadastrados:", voluntarios);
  };

  listarVoluntarios();
});

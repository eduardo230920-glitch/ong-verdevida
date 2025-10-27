
const sections = {
  home: `
    <section class="hero">
      <h2>Juntos pela preservação do planeta 🌎</h2>
      <div class="botoes">
        <a href="#sobre" class="botao">Sobre Nós</a>
        <a href="#contato" class="botao">Entre em Contato</a>
      </div>
    </section>
  `,
  sobre: `
    <section id="sobre">
      <h3>Quem Somos</h3>
      <p>A <strong>ONG Mundo Verde</strong> é dedicada à proteção ambiental, reflorestamento e educação ecológica.</p>
    </section>
  `,
  contato: `
    <section id="contato">
      <h3>Entre em Contato</h3>
      <form id="form-contato">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" placeholder="Seu nome completo" required aria-required="true">

        <label for="email">E-mail:</label>
        <input type="email" id="email" placeholder="Seu e-mail" required aria-required="true">

        <label for="mensagem">Mensagem:</label>
        <textarea id="mensagem" placeholder="Escreva sua mensagem..." required aria-required="true"></textarea>

        <button type="submit" class="botao">Enviar Mensagem</button>
      </form>
      <div id="mensagem-erro" style="color:red; margin-top:10px;"></div>
    </section>
  `
};


const main = document.getElementById("conteudo");


function renderSection(sectionId) {
  if(sections[sectionId]){
    main.innerHTML = sections[sectionId];
    if(sectionId === "contato"){
      setupFormValidation();
    }
  }
}


document.querySelectorAll('nav a, .botao').forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if(href.startsWith("#")){
      e.preventDefault();
      const sectionId = href.replace("#", "");
      renderSection(sectionId);
      history.pushState({page: sectionId}, "", href);
    }
  });
});


window.addEventListener("popstate", e => {
  if(e.state && e.state.page){
    renderSection(e.state.page);
  } else {
    renderSection("home");
  }
});


function setupFormValidation(){
  const form = document.getElementById("form-contato");
  const erro = document.getElementById("mensagem-erro");

  form.addEventListener("submit", e => {
    e.preventDefault();
    erro.textContent = "";

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    let valid = true;
    if(nome.length < 3){
      valid = false;
      erro.textContent = "Por favor, insira um nome válido (mínimo 3 caracteres).";
      form.nome.focus();
    } else if(!/^\S+@\S+\.\S+$/.test(email)){
      valid = false;
      erro.textContent = "Por favor, insira um e-mail válido.";
      form.email.focus();
    } else if(mensagem.length < 10){
      valid = false;
      erro.textContent = "Mensagem muito curta, descreva melhor sua dúvida ou sugestão.";
      form.mensagem.focus();
    }

    if(valid){
      alert("Obrigado pelo contato! Em breve responderemos sua mensagem.");
      form.reset();
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  renderSection("home");

  
  const nav = document.querySelector("nav ul");
  const toggle = document.createElement("button");
  toggle.textContent = "☰ Menu";
  toggle.classList.add("menu-toggle");
  toggle.setAttribute("aria-label", "Abrir ou fechar menu de navegação");
  toggle.setAttribute("aria-expanded", "false");
  document.querySelector("header").insertBefore(toggle, nav);

  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
  });

  
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if(target) target.scrollIntoView({behavior:"smooth"});
    });
  });
});

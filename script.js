function salvar() {
  const nome = document.getElementById('nome').value;
  const cargo = document.getElementById('cargo').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  const dados = { nome, cargo, email, telefone };
  localStorage.setItem('cartaoFlamengo', JSON.stringify(dados));
  mostrarDados();
}

function mostrarDados() {
  const dados = JSON.parse(localStorage.getItem('cartaoFlamengo'));
  if (dados) {
    document.getElementById('output').innerText =
      `Nome: ${dados.nome}\nCargo: ${dados.cargo}\nEmail: ${dados.email}\nTelefone: ${dados.telefone}`;
  }
}

mostrarDados();

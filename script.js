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

function exportarVCF() {
  const dados = JSON.parse(localStorage.getItem('cartaoFlamengo'));
  if (!dados) return;

  const vcf = `BEGIN:VCARD\nVERSION:3.0\nN:${dados.nome};;;;\nFN:${dados.nome}\nTITLE:${dados.cargo}\nTEL;TYPE=CELL:${dados.telefone}\nEMAIL:${dados.email}\nEND:VCARD`;
  const blob = new Blob([vcf], { type: 'text/vcard' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cartao.vcf';
  a.click();
}

function gerarQRCode() {
  const dados = JSON.parse(localStorage.getItem('cartaoFlamengo'));
  if (!dados) return;

  const vcf = `BEGIN:VCARD\nVERSION:3.0\nN:${dados.nome};;;;\nFN:${dados.nome}\nTITLE:${dados.cargo}\nTEL;TYPE=CELL:${dados.telefone}\nEMAIL:${dados.email}\nEND:VCARD`;

  const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(vcf);
  document.getElementById('qr').innerHTML = '<img src="' + qrUrl + '" alt="QR Code">';
}

mostrarDados();
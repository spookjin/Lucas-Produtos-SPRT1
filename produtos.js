const url = 'http://localhost:3000/produtos';

document.addEventListener('DOMContentLoaded', carregarProdutos);

async function carregarProdutos() {
  const res = await fetch(url);
  const produtos = await res.json();
  const tabela = document.getElementById('tabela-produtos');
  tabela.innerHTML = '';

  produtos.forEach(prod => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${prod.id}</td>
      <td>${prod.nomeProduto}</td>
      <td>${prod.categoria}</td>
      <td>${prod.unidade}</td>
      <td>${prod.estoqueMin}</td>
      <td>${prod.estoqueAtual}</td>
      <td>
        <button class="btn small edt" onclick="editarProduto(${prod.id})">✏️</button>
        <button class="btn small rmv" onclick="removerProduto(${prod.id})">🗑️</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}

async function adicionarProduto(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const unidade = prompt("Digite a unidade de medida (ex: kg, un, cx):");
  const estoqueMin = prompt("Digite o estoque mínimo:");
  const estoqueAtual = document.getElementById('quantidade').value;
  const preco = document.getElementById('preco').value;

  const novoProduto = {
    nomeProduto: nome,
    categoria: categoria,
    unidade: unidade,
    estoqueMin: parseInt(estoqueMin),
    estoqueAtual: parseInt(estoqueAtual),
    precoUnitario: parseFloat(preco)
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novoProduto)
  });

  if (res.ok) {
    document.getElementById('form-produto').reset();
    carregarProdutos();
  } else {
    alert('Erro ao adicionar produto.');
  }
}

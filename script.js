const drinks = [
  {
    nome: "Mojito",
    ingredientes: [
      "60ml de rum",
      "30ml suco de limão",
      "30ml xarope de açúcar",
      "8 folhas de hortelã",
      "Água com gás",
      "Gelo",
    ],
    preparo:
      "Dê uma palmada nas folhas de hortelã e coloque junto com os líquidos no copo maior da coqueteleira. Encha o copo menor da coqueteleira com gelo e bata por 10 a 15 segundos.",
    foto: "images/Mojito.jpg",
  },
  {
    nome: "Negroni",
    ingredientes: [
      "40ml de Gin",
      "40ml de Campari",
      "40ml de Vermouth",
      "Casca de laranja Bahia",
      "Gelo",
    ],
    preparo:
      "Coloque gelo no mixing glass e misture as bebidas. Sirva num copo baixo de whisky, corte um pedaço da casca e jogue os óleos essenciais no drink. Finalize fazendo um twist com a casca de laranja.",
    foto: "images/Negroni.jpg",
  },

  {
    nome: "Whisky Sour",
    ingredientes: [
      "60ml de whisky",
      "30ml de suco de limão siciliano",
      "30ml de xarope de açúcar",
      "Espuma de gengibre",
      "Melaço de cana",
    ],
    preparo:
      "Adicione os líquidos na coqueteleira junto com gelo, bata por 10 a 15 segundos. Faça dupla coagem com strainer e peneira Sirva no copo baixo para whisky com uma pedra de gelo grande. Decore com a espuma de gengibre e o melaço de cana",
    foto: "images/Whisky_Sour.jpg",
  },

  {
    nome: "Fitzgerald",
    ingredientes: [
      "60ml de gin",
      "30ml de xarope de açúcar",
      "30ml suco de limão siciliano",
      "2 dashes de Angostura Bitter",
      "Casca de limão siciliano",
      "Gelo",
    ],
    preparo:
      "Bata todos os líquidos na coqueteleira com gelo. Sirva no copo baixo com uma pedra de gelo. Decore com casca de limão siciliano ou uma rodela",
    foto: "images/Fitzgerald.jpg",
  },

  {
    nome: "Aperol Spritz",
    ingredientes: [
      "60ml de Aperol",
      "90ml de Salton Brut",
      "Água com gás",
      "2 dashes de Angostura Bitter",
      "1 fatia de laranja Bahia",
      "Gelo",
    ],
    preparo:
      "Pegue a taça e encha de gelo, use a colher bailarina para girar o gelo dentro da taça e descarte a água que ficará dentro. Adicione o Aperol e com cuidado o espumante e a água com gás. Misture devagar para não tirar o gás do drink. Coloque a fatia de laranja ou corte em meia lua para decorar",
    foto: "images/Aperol_Spritz",
  },
];

function normalize(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderDrink(drink) {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <div class="card">
    <h2>${drink.nome}</h2>
    <img src="${drink.foto}" alt="${
    drink.nome
  }" onerror="this.src='images/placeholder.jpg'">
        <h3>Ingredientes</h3>
        <ul>
            ${drink.ingredientes.map((i) => `<li>${i}</li>`).join("")}
        </ul>
        <h3>Preparo</h3>
        <p>${drink.preparo}</p>
        </div>
    `;
}

function renderMatches(matches) {
  const resultado = document.getElementById("resultado");

  if (matches.length === 0) {
    resultado.innerHTML = `<p>Nenhum resultado encontrado. Tente outra palavra.</p>`;
    return;
  }
  if (matches.length === 1) {
    renderDrink(matches[0]);
    return;
  }

  resultado.innerHTML = `
    <ul class="matches-list">
    ${matches
      .map(
        (m, i) => `
        <li class="match-item" data-index="${i}">
        <img src="${m.foto}" alt="${m.nome}" onerror="this.src='images/placeholder.jpg'">
        <span> ${m.nome} </span>
        </li>`
      )
      .join("")}
        </ul>
        `;
  document.querySelectorAll(".match-item").forEach((item) => {
    item.addEventListener("Click", () => {
      const idx = Number(item.getAttribute("data-index"));
      renderDrink(matches[idx]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function search(query) {
  const q = normalize(query);
  if (!q) {
    document.getElementById("resultado").innerHTML = "";
    return;
  }
  const matches = drinks.filter((d) => {
    const nome = normalize(d.nome);
    const ingredientes = normalize(d.ingredientes.join(""));
    return nome.includes(q) || ingredientes.includes(q);
  });

  renderMatches(matches);
}

const inputPesquisa = document.getElementById("pesquisa");
const botaoPesquisar = document.getElementById("botao-pesquisar");

botaoPesquisar.addEventListener("click", () =>
  search(inputPesquisa.value.trim())
);

inputPesquisa.addEventListener("keydown", (e) => {
  if (e.key === "Enter") search(inputPesquisa.value.trim());
});

let debounceTimer;
inputPesquisa.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    search(inputPesquisa.value.trim());
  }, 250);
});

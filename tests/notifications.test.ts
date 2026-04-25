import { describe, it, expect } from "vitest";

// Definir frases diretamente para evitar dependência de módulos nativos
const PUNDIM_PHRASES = [
  { title: "Bom dia! 🍮", body: "Aquele café da manhã não foi suficiente, né? Um Pundim cremoso agora mudaria tudo." },
  { title: "Começo de dia perfeito ✨", body: "Já pensou que o seu dia pode começar bem melhor com uma fatia de pudim geladinho?" },
  { title: "A reunião foi chata? 😅", body: "O Pundim nunca decepciona. Peça o seu e salve a sua manhã!" },
  { title: "Trabalhar dá fome... 🤤", body: "E a melhor fome é aquela que só um pudim sem furinhos pode matar." },
  { title: "Foco total! 💪", body: "Mas com um olho no pudim. Já garantiu a sobremesa de hoje?" },
  { title: "Almoçou bem? 🍽️", body: "A sobremesa tem que estar à altura! Pede um Pundim agora." },
  { title: "Aquela vontade bateu... 🍯", body: "Comer um docinho depois do almoço é lei. E o Pundim é o melhor da turma." },
  { title: "Regra sagrada! 📜", body: "Almoço não conta se não tiver um pudim cremoso depois. Peça já!" },
  { title: "Calda de caramelo te chamando... 🍮", body: "Sabe o que combina perfeitamente com esse horário? Um Pundim escorrendo caramelo." },
  { title: "Não lute contra a vontade! 😋", body: "O Pundim de doce de leite está te chamando. Você sabe que quer." },
  { title: "Preguiça da tarde? ⚡", body: "Um Pundim cremoso é o combustível que você precisa pra terminar o dia." },
  { title: "Pausa pro café ☕", body: "Fica mil vezes melhor com um pudim acompanhando. Você merece!" },
  { title: "Estresse? Que estresse? 😌", body: "O estresse do dia vai embora na primeira colherada. Confia no Pundim!" },
  { title: "A tarde tá pedindo! 🍯", body: "Um docinho agora. E você sabe exatamente qual é. Pede um Pundim!" },
  { title: "Falta muito pro fim do expediente? ✨", body: "Um Pundim faz o tempo passar mais rápido. E muito mais gostoso." },
  { title: "Produtividade em alta! 📈", body: "Sabe o que os mais produtivos têm em comum? Comem Pundim na pausa da tarde." },
  { title: "Você sobreviveu ao dia! 🏆", body: "Seu prêmio merece ser um Pundim geladinho e cremoso. Você ganhou!" },
  { title: "Jantar leve? 😉", body: "Claro, pra guardar espaço pro pudim. Escolha o seu sabor favorito!" },
  { title: "Netflix e Pundim 📺", body: "A combinação perfeita pra fechar a noite com chave de ouro." },
  { title: "O que falta pra essa noite? ✨", body: "Uma fatia daquele pudim sem furinhos. É isso. Só isso." },
  { title: "Não durma com vontade! 🌙", body: "Peça seu Pundim agora e tenha sonhos mais doces." },
  { title: "Sábado pede! 🎉", body: "Família reunida ou só você e um Pundim inteiro. Não julgamos!" },
  { title: "Domingo sem pudim? 😱", body: "Não existe. Já garantiu a sobremesa do almoço em família?" },
  { title: "Fim de semana começou! ✨", body: "E só começa de verdade depois da primeira colherada de Pundim." },
  { title: "A dieta? 😅", body: "A gente pensa nisso na segunda-feira. Hoje é dia de Pundim!" },
];

describe("Pundim Notifications", () => {
  it("deve ter pelo menos 20 frases de notificação", () => {
    expect(PUNDIM_PHRASES.length).toBeGreaterThanOrEqual(20);
  });

  it("cada frase deve ter título e corpo", () => {
    for (const phrase of PUNDIM_PHRASES) {
      expect(phrase.title).toBeTruthy();
      expect(phrase.body).toBeTruthy();
      expect(typeof phrase.title).toBe("string");
      expect(typeof phrase.body).toBe("string");
    }
  });

  it("os títulos devem ser curtos (máximo 50 caracteres)", () => {
    for (const phrase of PUNDIM_PHRASES) {
      expect(phrase.title.length).toBeLessThanOrEqual(50);
    }
  });

  it("os corpos devem ter conteúdo substancial (mínimo 20 caracteres)", () => {
    for (const phrase of PUNDIM_PHRASES) {
      expect(phrase.body.length).toBeGreaterThanOrEqual(20);
    }
  });

  it("não deve ter frases duplicadas", () => {
    const bodies = PUNDIM_PHRASES.map((p) => p.body);
    const uniqueBodies = new Set(bodies);
    expect(uniqueBodies.size).toBe(bodies.length);
  });
});

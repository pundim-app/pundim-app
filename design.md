# Design do Aplicativo Pundim

## Identidade Visual

A identidade visual é baseada no perfil do Instagram @pundim.jundiai. O estilo é cartoon/ilustrado, alegre e apetitoso, com um mascote de pudim animado fazendo "joinha".

### Paleta de Cores

| Token | Cor Light | Uso |
|-------|-----------|-----|
| `primary` | `#F07800` | Laranja vibrante — botões, destaques, CTA |
| `background` | `#FFF8EE` | Creme claro — fundo das telas |
| `surface` | `#FFFFFF` | Branco — cards e superfícies elevadas |
| `foreground` | `#3D1A00` | Marrom escuro — texto principal |
| `muted` | `#A0522D` | Marrom médio — texto secundário |
| `border` | `#F5DEB3` | Bege dourado — bordas e divisores |
| `caramel` | `#D4860A` | Dourado caramelo — elementos decorativos |
| `accent` | `#FF6B00` | Laranja intenso — notificações, badges |

### Tipografia

Fontes arredondadas e amigáveis, compatíveis com o estilo cartoon da marca. Usar `Nunito` (Google Fonts) como fonte principal — bold para títulos, regular para corpo.

## Telas do Aplicativo

### 1. Splash Screen
- Fundo creme (#FFF8EE)
- Logo/mascote centralizado com animação de entrada
- Nome "Pundim" em laranja bold

### 2. Home Screen (Principal)
- Header com logo Pundim e slogan "Pudim caseiro e cremoso"
- Hero card grande com foto apetitosa do pudim e CTA "Peça o seu!"
- Seção "Nossos Sabores" com cards horizontais (Tradicional, Doce de Leite, etc.)
- Botão flutuante de WhatsApp para pedidos
- Ondas decorativas de caramelo no topo e rodapé
- Mascote animado em destaque

### 3. Cardápio Screen
- Lista de sabores com cards visuais
- Cada card: foto, nome do sabor, descrição curta, botão de pedido
- Sabores: Tradicional, Doce de Leite, Chocolate, Prestígio

### 4. Sobre Nós Screen
- História da marca Pundim
- Localização: Jundiaí e região
- Contato via WhatsApp
- Redes sociais (Instagram)

### 5. Notificações Screen
- Histórico das notificações recebidas
- Toggle para ativar/desativar notificações
- Preview das frases motivacionais

## Fluxos Principais

**Pedido via WhatsApp:**
Home → Ver sabores → Tap "Peça o seu!" → Abre WhatsApp com mensagem pré-formatada

**Ativar Notificações:**
Primeiro acesso → Permissão de notificação → Notificações aleatórias ao longo do dia

**Ver Cardápio:**
Home → Tab "Cardápio" → Escolher sabor → Tap "Pedir" → WhatsApp

## Componentes Visuais

- **CaramelWave**: Ondas de caramelo decorativas (SVG) no topo/rodapé das telas
- **PudimCard**: Card com foto, nome e botão de ação
- **FloatingWhatsApp**: Botão flutuante verde do WhatsApp
- **MascotBanner**: Banner com o mascote e frase motivacional
- **NotificationBadge**: Badge de notificação no estilo da marca

## Animações

- Entrada suave das telas (fade + slide)
- Caramelo "escorrendo" animado no hero
- Mascote com animação de balanço suave (loop)
- Press feedback nos botões (scale 0.97)

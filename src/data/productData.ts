import { ProductImage, ProductSpec, Review, FAQItem } from '../types/product';

import img1 from '../assets/images/mOi8MWF.jpg';
import img2 from '../assets/images/yckxzg8.jpg';
import img3 from '../assets/images/Ly34v50.jpg';
import img4 from '../assets/images/YDVJfCM.jpg';
import img5 from '../assets/images/DbXBjcg.jpg';
import img6 from '../assets/images/kBZLmKO.jpg';
import lifestyleImg from '../assets/images/lifestyle_kid_playing_car_1790984211459.jpg';
import smokeCloseImg from '../assets/images/product_smoke_exhaust_close_1790984192578.jpg';
import carStudioImg from '../assets/images/product_spiderman_car_studio_1790984183312.jpg';
import controllerKitImg from '../assets/images/product_controller_and_kit_1790984201676.jpg';
import actionHeroImg from '../assets/images/hero_spiderman_car_action_1790984172056.jpg';

export const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: 'img-1',
    src: img1,
    alt: 'Carrinho de Controle Remoto Homem-Aranha com Fumaça e Luzes LED',
    caption: 'Carrinho Homem-Aranha Drift Nitro com Efeito Fumaça e Luzes',
    tag: 'Efeito Nitro'
  },
  {
    id: 'img-2',
    src: img2,
    alt: 'Carrinho Homem-Aranha vista em detalhe com iluminação e rodas esportivas',
    caption: 'Design Esportivo Oficial Homem-Aranha Escala 1:24',
    tag: 'Visão Detalhada'
  },
  {
    id: 'img-3',
    src: img3,
    alt: 'Escapamento com névoa de vapor d água e luzes neon',
    caption: 'Fumaça de Vapor d\'Água Fria 100% Segura e Inodora',
    tag: 'Tecnologia Fumaça'
  },
  {
    id: 'img-4',
    src: img4,
    alt: 'Controle Remoto 2.4GHz e acessórios do carrinho Homem-Aranha',
    caption: 'Controle Remoto 2.4GHz Anti-Interferência e Alta Precisão',
    tag: 'Controle 2.4GHz'
  },
  {
    id: 'img-5',
    src: img5,
    alt: 'Kit Completo do Carrinho com bateria recarregável e dosador',
    caption: 'Kit Completo Pronto para Usar: Carrinho, Controle, Bateria e Cabo USB',
    tag: 'Kit Completo'
  },
  {
    id: 'img-6',
    src: img6,
    alt: 'Carrinho Homem-Aranha pronto para corridas e manobras radicais',
    caption: 'Diversão Garantida para Crianças e Adultos em Qualquer Piso Liso',
    tag: 'Pronto para Correr'
  }
];

export const PRODUCT_PACKAGES = [
  {
    id: 'single' as const,
    name: '1 Carrinho · Edição Spider Drift Nitro',
    badge: 'Oferta 1 · Individual',
    originalPrice: 99.90,
    price: 49.90,
    pixPrice: 49.90,
    installments: 'Pagamento Exclusivo via PIX',
    savings: 50.00,
    freeShipping: true,
    bonus: 'Acompanha dosador de vapor d\'água + Cabo USB'
  },
  {
    id: 'double' as const,
    name: '2 Carrinhos · Combo Batalha de Drift',
    badge: 'Oferta 2 · Mais Vendido',
    originalPrice: 158.99,
    price: 89.90,
    pixPrice: 89.90,
    installments: 'Pagamento Exclusivo via PIX',
    savings: 69.09,
    freeShipping: true,
    bonus: '2 Kits Completos com frequências 2.4GHz independentes'
  },
  {
    id: 'triple' as const,
    name: '3 Carrinhos · Super Combo Família',
    badge: 'Oferta 3 · Maior Economia',
    originalPrice: 209.90,
    price: 137.90,
    pixPrice: 137.90,
    installments: 'Pagamento Exclusivo via PIX',
    savings: 72.00,
    freeShipping: true,
    bonus: '3 Kits Completos + 3 Dosadores + Envio Prioritário Full'
  }
];

export const TECHNICAL_SPECS: ProductSpec[] = [
  {
    category: 'Identificação & Estilo',
    items: [
      { label: 'Marca / Distribuidor', value: 'Vila dos Brinquedos' },
      { label: 'Tema / Personagem', value: 'Homem-Aranha (Spider-Man Racing Edition)', highlight: true },
      { label: 'Modelo do Produto', value: 'Spider Drift Vapor Turbo 1:24' },
      { label: 'Código de Referência', value: 'MLB-74916595-VB' },
      { label: 'Cor Predominante', value: 'Vermelho e Azul Metálico com grafismos de teia' }
    ]
  },
  {
    category: 'Dimensões & Construção',
    items: [
      { label: 'Escala do Veículo', value: '1:24 (tamanho compacto esportivo)', highlight: true },
      { label: 'Comprimento', value: '19,5 cm' },
      { label: 'Largura', value: '8,5 cm' },
      { label: 'Altura', value: '6,0 cm' },
      { label: 'Peso Total', value: 'Aprox. 280 gramas' },
      { label: 'Material da Carroceria', value: 'Plástico ABS de engenharia de alta densidade antichoque' },
      { label: 'Pneus', value: 'Borracha sintética macia com ranhuras para tração e drift lateral' }
    ]
  },
  {
    category: 'Efeitos Especiais & Iluminação',
    items: [
      { label: 'Efeito de Fumaça (Nitro)', value: 'Sistema ultrassônico com microvapor de água fria real', highlight: true },
      { label: 'Líquido Utilizado', value: 'Apenas água pura da torneira ou filtrada (100% atóxico e sem cheiro)' },
      { label: 'Capacidade do Reservatório', value: 'Aprox. 10 ml com vedação antivazamento de silicone' },
      { label: 'Iluminação Dianteira', value: 'Faróis em LED branco brilhante de alta intensidade' },
      { label: 'Iluminação Traseira', value: 'LEDs coloridos que iluminam o vapor de escape gerando efeito fogo/nitro', highlight: true }
    ]
  },
  {
    category: 'Controle Remoto & Desempenho',
    items: [
      { label: 'Frequência de Transmissão', value: '2.4 GHz digital anti-interferência (permite jogar vários carros juntos)', highlight: true },
      { label: 'Alcance do Sinal', value: 'Até 30 metros em campo aberto' },
      { label: 'Velocidade Máxima', value: 'Até 15 km/h (com aceleração instantânea)' },
      { label: 'Direções do Controle', value: '6 comandos: Frente, Ré, Esquerda, Direita, Giro 360° e Ativar Fumaça' },
      { label: 'Alimentação do Controle', value: '2 Pilhas AA 1.5V comuns (não inclusas)' }
    ]
  },
  {
    category: 'Bateria & Autonomia',
    items: [
      { label: 'Bateria do Carrinho', value: 'Lítio Recarregável 3.7V 500mAh de alta densidade (Inclusa)', highlight: true },
      { label: 'Duração da Bateria', value: '25 a 45 minutos contínuos (dependendo do uso do vapor/drift)' },
      { label: 'Tempo Médio de Recarga', value: '60 a 90 minutos' },
      { label: 'Conexão de Carregamento', value: 'Cabo USB inteligente com indicador LED de carga completa' }
    ]
  },
  {
    category: 'Segurança & Recomendações',
    items: [
      { label: 'Idade Recomendada', value: 'A partir de 3 anos (crianças e adultos)', highlight: true },
      { label: 'Certificação de Segurança', value: 'Testado conforme normas de conformidade para brinquedos seguros' },
      { label: 'Pisos Recomendados', value: 'Piso cerâmico, porcelanato, madeira, laminado, asfalto liso ou cimento queimado' }
    ]
  }
];

export const UNBOXING_ITEMS = [
  {
    name: '1x Carrinho Esportivo Homem-Aranha Escala 1:24',
    desc: 'Com reservatório integrado de vapor, iluminação LED nos faróis e escapamento.',
    highlight: true
  },
  {
    name: '1x Controle Remoto sem Fio 2.4GHz',
    desc: 'Design ergonômico com gatilho de aceleração e botão de comando de fumaça.',
    highlight: true
  },
  {
    name: '1x Bateria de Lítio Recarregável 3.7V',
    desc: 'Instalada com trava segura para evitar remoção acidental por crianças.',
    highlight: true
  },
  {
    name: '1x Cabo de Carregamento USB',
    desc: 'Compatível com qualquer carregador de celular, notebook ou powerbank.',
    highlight: false
  },
  {
    name: '1x Frasco Dosador / Pipeta Conta-Gotas',
    desc: 'Para injetar água com precisão no reservatório sem molhar o brinquedo.',
    highlight: false
  },
  {
    name: '1x Manual de Instruções Ilustrado',
    desc: 'Passo a passo simples em português explicando como abastecer e pilotar.',
    highlight: false
  },
  {
    name: '1x Caixa Original para Presente',
    desc: 'Embalagem resistente com arte vibrante do Homem-Aranha, perfeita para presente.',
    highlight: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Marcos Vinicius Silva',
    location: 'Campinas, SP',
    date: 'Há 3 dias',
    rating: 5,
    title: 'Meu filho de 5 anos ficou pirado com a fumaça!',
    comment: 'Comprei para o Dia das Crianças antecipado e superou todas as expectativas. O efeito da fumaça saindo do escapamento iluminado pelo LED azul e vermelho parece de filme de Velozes e Furiosos! Muito fácil de colocar água com o conta-gotas. A bateria dura bastante e carrega rápido no USB.',
    verified: true,
    likes: 38,
    highlight: 'Fumaça real iluminada surpreende',
    media: [
      {
        type: 'video',
        src: 'https://embed-ssl.wistia.com/deliveries/e6f7a5692b5a02beaf5cdb5d93a40096a1e0ffb8.bin',
        thumbnail: 'https://embed-ssl.wistia.com/deliveries/a8ca1cc4af61e2442820bfa889a73e2b79d41562.bin',
        alt: 'Vídeo da avaliação de Marcos Vinicius'
      },
      {
        type: 'image',
        src: 'https://i.imgur.com/REmiE7h.jpg',
        alt: 'Foto 1 - Carrinho e efeitos'
      },
      {
        type: 'image',
        src: 'https://i.imgur.com/Mem4jGm.jpg',
        alt: 'Foto 2 - Detalhe do brinquedo'
      },
      {
        type: 'image',
        src: 'https://i.imgur.com/rDkzsUx.jpg',
        alt: 'Foto 4 - Carrinho Homem-Aranha'
      }
    ]
  },
  {
    id: 'rev-2',
    author: 'Juliana Mendes Rocha',
    location: 'Belo Horizonte, MG',
    date: 'Há 5 dias',
    rating: 5,
    title: 'Qualidade do plástico impressiona, muito resistente!',
    comment: 'Criança pequena costuma bater o carrinho nas paredes e pés de cadeira. Esse carrinho é feito de um plástico bem grosso e resistente, já tomou várias batidas e continua intacto! O controle responde rápido e não dá interferência. Recomendo demais!',
    verified: true,
    likes: 24,
    highlight: 'Super resistente a colisões',
    media: [
      {
        type: 'video',
        src: 'https://embed-ssl.wistia.com/deliveries/4fbdd7a63d0aa90b850994cbedcdb728.bin',
        thumbnail: 'https://embed-ssl.wistia.com/deliveries/f42f2b4cf76c4c0d5f6aed8fb64544de8f1c6209.bin',
        alt: 'Vídeo da avaliação de Juliana Mendes'
      },
      {
        type: 'image',
        src: 'https://i.imgur.com/MpOJbke.jpg',
        alt: 'Foto 1 - Juliana Mendes'
      },
      {
        type: 'image',
        src: 'https://i.imgur.com/ONNSatG.jpg',
        alt: 'Foto 2 - Juliana Mendes'
      },
      {
        type: 'image',
        src: 'https://i.imgur.com/JzBr2Ew.jpg',
        alt: 'Foto 3 - Juliana Mendes'
      }
    ]
  },
  {
    id: 'rev-3',
    author: 'Rodrigo Albuquerque',
    location: 'Curitiba, PR',
    date: 'Há 1 semana',
    rating: 5,
    title: 'Comprei o combo de 2 carrinhos para os dois irmãos',
    comment: 'Melhor decisão ter pego o combo de 2 carrinhos! Por ter frequência 2.4Ghz eles correm juntos sem dar interferência no controle um do outro. Eles apostam corrida na sala e a fumaça de água fria não mancha nada e não solta cheiro.',
    verified: true,
    likes: 41,
    highlight: '2.4GHz perfeito para jogar em dupla',
    media: [
      {
        type: 'video',
        src: 'https://embed-ssl.wistia.com/deliveries/a1656e1e50fbee4d86dd51a64547347a.bin',
        thumbnail: 'https://embed-ssl.wistia.com/deliveries/c1302234ae528cc56434d8b8d52652bac43e98fc.bin',
        alt: 'Vídeo da avaliação de Rodrigo Albuquerque'
      }
    ]
  },
  {
    id: 'rev-4',
    author: 'Patricia Souza',
    location: 'Rio de Janeiro, RJ',
    date: 'Há 2 semanas',
    rating: 5,
    title: 'Entrega rápida e embalagem perfeita para presente',
    comment: 'Chegou no dia seguinte pelo Full. Caixa muito bonita e o brinquedo já vem com a bateria recarregável. É só carregar um pouco, colocar as pilhas no controle e começar a diversão. Vale cada centavo.',
    verified: true,
    likes: 19,
    highlight: 'Chegou rápido e pronto para presentear',
    media: [
      {
        type: 'video',
        src: 'https://embed-ssl.wistia.com/deliveries/dea81f3da167775d8397094b53f0cac7c0f95064.bin',
        thumbnail: 'https://embed-ssl.wistia.com/deliveries/752d02547437c1097527ac8988f4008106bd9617.bin',
        alt: 'Vídeo da avaliação de Patricia Souza'
      }
    ]
  },
  {
    id: 'rev-6',
    author: 'Camila Nogueira Lima',
    location: 'Salvador, BA',
    date: 'Há 6 dias',
    rating: 5,
    title: 'Comprei para meu afilhado e ele não larga mais!',
    comment: 'Presente impecável! O carrinho é muito veloz, o controle é super macio e a fumaça de água é uma sacada genial porque não suja nada dentro de casa. Vieram todos os acessórios certinhos.',
    verified: true,
    likes: 27,
    highlight: 'Diversão garantida sem sujeira',
    media: [
      {
        type: 'video',
        src: 'https://embed-ssl.wistia.com/deliveries/965e0c5c745eaea29c5cf1d2c61b600b0368b5a8.bin',
        thumbnail: 'https://embed-ssl.wistia.com/deliveries/cf03960c96c417e54060609eb4ce7d74d16bcb90.bin',
        alt: 'Vídeo da avaliação de Camila Nogueira Lima'
      },
      {
        type: 'image',
        src: 'https://i.imgur.com/NwnBeQP.png',
        alt: 'Foto enviada por Camila Nogueira Lima'
      }
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Como funciona o efeito de fumaça? É perigoso ou quente?',
    answer: 'É 100% seguro para crianças! O sistema utiliza uma placa ultrassônica que transforma água fria comum em microgotículas de vapor de água (semelhante a um umidificador de ar). A fumaça é fria ao toque, não esquenta, não queima e não solta nenhum tipo de odor ou fumaça química tóxica.',
    category: 'Tecnologia & Fumaça'
  },
  {
    question: 'Qual líquido devo usar para fazer a fumaça?',
    answer: 'Você só precisa de água pura da torneira ou filtrada! Nunca use óleos essenciais, perfumes ou solventes. Uma simples abastecida com 4 a 5 gotas com a bisnaga dosadora que enviamos no kit já garante vários minutos de fumaça contínua.',
    category: 'Tecnologia & Fumaça'
  },
  {
    question: 'A bateria é recarregável? Preciso ficar comprando pilhas?',
    answer: 'O carrinho vem acompanhado de uma bateria de Lítio 3.7V recarregável e um cabo USB de carga rápida. Você só precisa de 2 pilhas AA comuns (ou recarregáveis) para o controle remoto, que duram meses devido ao baixo consumo do sinal 2.4GHz.',
    category: 'Bateria & Carregamento'
  },
  {
    question: 'Dois carrinhos podem correr juntos sem misturar o sinal do controle?',
    answer: 'Sim! Graças à frequência digital 2.4GHz com emparelhamento individual, você pode colocar 2 ou mais carrinhos correndo ao mesmo tempo na mesma sala sem qualquer tipo de interferência entre os controles remotos.',
    category: 'Controle & Desempenho'
  },
  {
    question: 'O carrinho faz curvas e drift em qualquer piso?',
    answer: 'Ele tem tração calibrada para superfícies lisas: pisos de cerâmica, porcelanato, laminado de madeira, cimento polido e asfalto plano. Pneus de borracha macia com boa aderência para manobras de drift 360°.',
    category: 'Controle & Desempenho'
  },
  {
    question: 'Qual é o prazo de entrega e como funciona a garantia?',
    answer: 'Pedidos aprovados são despachados no mesmo dia via modalidade rápida expressa para todo o Brasil. Você conta com Garantia Total de 90 dias contra qualquer defeito de fabricação e 30 dias para devolução grátis caso não fique 100% satisfeito.',
    category: 'Envio & Garantia'
  }
];

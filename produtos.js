const produtos = [
    {
        id: 1,
        nome: "Memória DDR4 Corsair Vengeance RGB Pro, 16GB (2x8GB)",
        imagem: "Img/RAM_corsair.jpg",
        alt: "Memória DDR4 Corsair Vengeance RGB Pro 16GB (2x8GB)",
        preco: 699.90,
        parcelas: 10,
        caracteristicas: [
            "Capacidade: 16GB (2x8GB).",
            "Tipo: DDR4.",
            "Frequência: 3200MHz.",
            "RGB Integrado.",
            "Compatível com Intel e AMD."
        ],
        descricao: "A memória DDR4 VENGEANCE RGB PRO Series da CORSAIR com overclocking ilumina seu PC com luzes RGB dinâmicas multizona enquanto oferece o melhor desempenho.",
        avaliacoes: [
            { estrelas: 3, autor: "Pietro", data: "22/02/2026", texto: "malditas IAS que estão deixando tudo caro. Basta de novela de frutinha." },
            { estrelas: 5, autor: "Nicolas Neto", data: "10/03/2026", texto: "Um preço justo considerando as novelas de frutinhas. Viva as IAS!!!" },
            { estrelas: 1, autor: "Cauã", data: "05/01/2026", texto: "Comprei e explodiu." },
            { estrelas: 2, autor: "Petrus Gunder", data: "18/12/2025", texto: "esa Tranceira veio muito legal mas ta muinto caro nao recomento" }
        ]
    },
    {
        id: 2,
        nome: "Gabinete montech X3 mesh",
        imagem: "Img/gabinete_Montech_X3_MESH.jpg",
        alt: "Gabinete montech X3 mesh",
        preco: 299.99,
        parcelas: 10,
        caracteristicas: [
            "Frontal em malha (mesh) para melhor fluxo de ar.",
            "Suporta placas-mãe ATX, Micro-ATX e Mini-ITX.",
            "Painel lateral em vidro temperado.",
            "Espaço para até 6 fans.",
            "Gerenciamento de cabos facilitado."
        ],
        descricao: "O gabinete Montech X3 Mesh oferece ótimo fluxo de ar graças ao seu frontal perfurado, além de um visual moderno com vidro temperado lateral para exibir seus componentes.",
        avaliacoes: [
            { estrelas: 5, autor: "Pedro ledless", data: "12/01/2026", texto: "Apenas por ser um gabinete sem frufru ja vale o preço." },
            { estrelas: 4, autor: "Ryan Martinez", data: "03/02/2026", texto: "Vale lembrar que precisa de uma chave philips pra abrir." }
        ]
    },
    {
        id: 3,
        nome: "CPU Ryzen 5 5500",
        imagem: "Img/R5-5500.jpg",
        alt: "CPU Ryzen 5 5500",
        preco: 578.99,
        parcelas: 10,
        caracteristicas: [
            "6 núcleos / 12 threads.",
            "Clock base de 3.6GHz, turbo até 4.2GHz.",
            "Soquete AM4.",
            "Não acompanha vídeo integrado.",
            "Cooler Wraith Stealth incluso."
        ],
        descricao: "O Ryzen 5 5500 é uma excelente opção custo-benefício para quem quer montar um PC gamer de entrada, com ótimo desempenho em jogos e tarefas do dia a dia.",
        avaliacoes: [
            { estrelas: 5, autor: "Hank", data: "15/01/2026", texto: "Serviu bem pro que eu queria." },
            { estrelas: 4, autor: "Jesse", data: "20/01/2026", texto: "Cara, esse processador é ótimo, mas é PCI-e 3.0" }
        ]
    },
    {
        id: 4,
        nome: "CPU Intel Core Ultra 7 270k Plus",
        imagem: "Img/core-u7-270k+.jpg",
        alt: "CPU Intel Core Ultra 7 270k Plus",
        preco: 1999.90,
        parcelas: 10,
        caracteristicas: [
            "Arquitetura Intel de última geração.",
            "Alto desempenho em multitarefa e jogos.",
            "Suporte a memórias DDR5.",
            "Overclock liberado (versão K).",
            "TDP configurável."
        ],
        descricao: "O Core Ultra 7 270K Plus entrega desempenho de ponta para gamers e criadores de conteúdo, com arquitetura eficiente e suporte às tecnologias mais recentes.",
        avaliacoes: [
            { estrelas: 5, autor: "Rafael", data: "01/02/2026", texto: "Apesar de ser a mesma geração de antes, o desempenho melhorou bastante." },
            { estrelas: 5, autor: "Jorge Aldubo", data: "05/02/2026", texto: "funcionou bem no adobe, desempenho aumentou muito" }
        ]
    },
    {
        id: 5,
        nome: "Placa de vídeo intel ARC B580",
        imagem: "Img/intel-arc-b580.jpg",
        alt: "Placa de vídeo intel ARC B580",
        preco: 2099.99,
        parcelas: 10,
        caracteristicas: [
            "12GB de memória GDDR6.",
            "Suporte a Ray Tracing.",
            "Ideal para jogos em Full HD e QHD.",
            "Conectores DisplayPort e HDMI.",
            "Tecnologia Intel XeSS."
        ],
        descricao: "A Intel ARC B580 é uma placa de vídeo com ótimo custo-benefício, entregando boa performance em jogos atuais com recursos modernos como ray tracing e upscaling via XeSS.",
        avaliacoes: [
            { estrelas: 5, autor: "Cauã", data: "10/02/2026", texto: "Melhor placa já feita na história." },
            { estrelas: 2, autor: "Nicolas", data: "12/02/2026", texto: "Quem compra uma placa da intel? se fosse processador eu até entenderia." }
        ]
    },
    {
        id: 6,
        nome: "Placa mãe Maxsun Z890",
        imagem: "Img/maxsun-z890.webp",
        alt: "Placa mãe Maxsun Z890",
        preco: 2746.30,
        parcelas: 10,
        caracteristicas: [
            "Chipset Intel Z890.",
            "Suporte a memórias DDR5.",
            "Múltiplos slots M.2 NVMe.",
            "Wi-Fi e Bluetooth integrados.",
            "Iluminação RGB integrada."
        ],
        descricao: "A placa-mãe Maxsun Z890 oferece recursos modernos para as CPUs Intel mais recentes, com boa entrega de energia e conectividade completa.",
        avaliacoes: [
            { estrelas: 5, autor: "Thiago", data: "18/02/2026", texto: "Fiz overclock e ficou liso liso liso." },
            { estrelas: 2, autor: "Romeu", data: "20/02/2026", texto: "A bios tá em chines e eu não sei mudar." }
        ]
    },
    {
        id: 7,
        nome: "Placa mãe B550 Aorus Elite",
        imagem: "Img/b550m-asus-elite.webp",
        alt: "Placa-mãe B550",
        preco: 739.99,
        parcelas: 10,
        caracteristicas: [
            "Chipset AMD B550.",
            "Suporte a processadores Ryzen (AM4).",
            "Slot PCIe 4.0.",
            "Dissipadores reforçados.",
            "Áudio de alta definição."
        ],
        descricao: "A Aorus Elite B550 é uma placa-mãe robusta para quem quer montar um PC Ryzen com boa entrega de energia e recursos completos para jogos e produtividade.",
        avaliacoes: [
            { estrelas: 3, autor: "Marcelo", data: "22/02/2026", texto: "Não veio parafuso do NVME" },
            { estrelas: 1, autor: "Eduardo", data: "25/02/2026", texto: "Queimou com 3 semanas de uso e não me ressarciram." }
        ]
    },
    {
        id: 8,
        nome: "Fonte Coolermaster Gold 850",
        imagem: "Img/fonte-coolermaster-gold-850.webp",
        alt: "fonte coolermaster gold 850",
        preco: 399.99,
        parcelas: 10,
        caracteristicas: [
            "Potência de 850W.",
            "Certificação 80 Plus Gold.",
            "Modular (cabos removíveis).",
            "Ventoinha silenciosa.",
            "Proteções contra sobretensão e curto-circuito."
        ],
        descricao: "A fonte Coolermaster Gold 850 garante energia estável e eficiente para configurações de alto desempenho, com cabos modulares para facilitar a montagem.",
        avaliacoes: [
            { estrelas: 5, autor: "Henrique", data: "01/03/2026", texto: "Meu pc ficou mais bonito e Não aumentou a conta de luz." },
            { estrelas: 5, autor: "Luiza", data: "03/03/2026", texto: "Está alimentando meu servidor tranquilamente." }
        ]
    },
    {
        id: 9,
        nome: "NVME Kingston 2TB",
        imagem: "Img/nvme-2tb-kingston.jpg",
        alt: "NVME Kingston 2TB",
        preco: 1759.99,
        parcelas: 10,
        caracteristicas: [
            "Capacidade de 2TB.",
            "Interface NVMe PCIe.",
            "Velocidades de leitura/escrita elevadas.",
            "Formato M.2 2280.",
            "Ideal para jogos e edição de mídia."
        ],
        descricao: "O SSD NVMe Kingston 2TB oferece velocidade e capacidade para quem precisa de armazenamento rápido para jogos, aplicativos e arquivos grandes.",
        avaliacoes: [
            { estrelas: 5, autor: "Eduardo", data: "05/03/2026", texto: "Têm bastantante armazenamento, mas poderia ser mais" },
            { estrelas: 5, autor: "Eduardo", data: "07/03/2026", texto: "Comprei mais, agora sim ficou bom." }
        ]
    }
];

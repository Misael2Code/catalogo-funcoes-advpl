/**
 * Catalogo de Funcoes ADVPL - Modulo Arrays
 * Funcoes essenciais para manipulacao de vetores e matrizes
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "aAdd",
    categoria: "Arrays",
    sintaxe: "aAdd( <aDestino>, <expValor> )",
    retorno: "Qualquer tipo (retorna o valor adicionado)",
    descricaoCurta: "Adiciona dinamicamente um novo elemento ao final de um array.",
    descricaoDetalhada: "Aumenta o tamanho do array <aDestino> em uma posicao e armazena o valor <expValor> nessa nova posicao. E a funcao mais utilizada para construcao de listas, matrizes de itens e configuracoes de aCols/aHeader no Protheus.",
    parametros: [
      { nome: "aDestino", tipo: "Array", descricao: "Array que recebera o novo elemento.", opcional: false },
      { nome: "expValor", tipo: "Qualquer tipo", descricao: "Elemento a ser adicionado (pode ser numero, string, data, objeto ou outro array).", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Criacao de lista de produtos e matriz bidimensional
User Function ExaAdd()
    Local aProdutos := {}
    Local aItensNF  := {}

    // Adicionando elementos simples a um array
    aAdd(aProdutos, "PROD001")
    aAdd(aProdutos, "PROD002")
    aAdd(aProdutos, "PROD003")

    // Adicionando subarrays (criacao de matriz com Codigo, Descricao, Preco)
    aAdd(aItensNF, {"PROD001", "TECLADO USB", 85.50})
    aAdd(aItensNF, {"PROD002", "MOUSE OPTICO", 45.00})

    ConOut("Total de produtos cadastrados: " + cValToChar(Len(aProdutos)))
    ConOut("Primeiro item da matriz: " + aItensNF[1][2])
Return`
  },
  {
    nome: "aScan",
    categoria: "Arrays",
    sintaxe: "aScan( <aArray>, <expBusca>, [<nInicio>], [<nQtd>] )",
    retorno: "Numerico",
    descricaoCurta: "Localiza um valor ou expressao code-block dentro de um array, retornando sua posicao.",
    descricaoDetalhada: "Pesquisa por um valor literal ou avalia uma expressao em bloco de codigo {|x| ...} para cada elemento do array. Retorna a posicao do elemento localizado (base 1) ou 0 caso nao seja encontrado.",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Array onde a pesquisa sera efetuada.", opcional: false },
      { nome: "expBusca", tipo: "Qualquer tipo / Bloco de Codigo", descricao: "Valor a ser buscado ou Code-block de comparacao {|x| ...}.", opcional: false },
      { nome: "nInicio", tipo: "Numerico", descricao: "Posicao inicial da busca (padrao: 1).", opcional: true },
      { nome: "nQtd", tipo: "Numerico", descricao: "Numero de elementos a pesquisar a partir de nInicio.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Busca simples e busca em matriz multidimensional com code-block
User Function ExaScan()
    Local aCores := {"AZUL", "VERMELHO", "VERDE", "AMARELO"}
    Local aItens := { {"001", "MOUSE", 35.00}, {"002", "TECLADO", 80.00} }
    Local nPos1  := 0
    Local nPos2  := 0

    // 1. Busca simples de valor
    nPos1 := aScan(aCores, "VERDE")
    ConOut("Posicao de VERDE: " + cValToChar(nPos1)) // 3

    // 2. Busca em matriz bidimensional procurando o codigo "002"
    nPos2 := aScan(aItens, {|x| x[1] == "002"})
    If nPos2 > 0
        ConOut("Produto encontrado: " + aItens[nPos2][2] + " na linha " + cValToChar(nPos2))
    EndIf
Return`
  },
  {
    nome: "aSort",
    categoria: "Arrays",
    sintaxe: "aSort( <aArray>, [<nInicio>], [<nQtd>], [<bBloco>] )",
    retorno: "Array",
    descricaoCurta: "Ordena os elementos de um array em ordem crescente ou conforme criterio customizado.",
    descricaoDetalhada: "Classifica os dados do array. Por padrao ordena em ordem crescente. Caso necessite de ordem decrescente ou ordenacao por coluna especifica de uma matriz multidimensional, utilize um code-block com dois parametros {|x, y| x > y}.",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Array a ser ordenado (modifica o array original).", opcional: false },
      { nome: "nInicio", tipo: "Numerico", descricao: "Indice inicial para ordenacao (padrao: 1).", opcional: true },
      { nome: "nQtd", tipo: "Numerico", descricao: "Quantidade de elementos a ordenar.", opcional: true },
      { nome: "bBloco", tipo: "Bloco de Codigo", descricao: "Code-block de comparacao {|x, y| x < y} para personalizar o criterio.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Ordenacao de vetor simples e de matriz por coluna especifica
User Function ExaSort()
    Local aNumeros := {15, 3, 42, 8, 23}
    Local aClientes:= { {"03", "CARLOS"}, {"01", "ANA"}, {"02", "BEATRIZ"} }

    // Ordenacao simples crescente
    aSort(aNumeros)
    ConOut("Primeiro numero: " + cValToChar(aNumeros[1])) // 3

    // Ordenacao de matriz pelo Codigo (coluna 1)
    aSort(aClientes, , , {|x, y| x[1] < y[1]})
    ConOut("Cliente ordenado 1: " + aClientes[1][2]) // "ANA"

    // Ordenacao decrescente pelo Nome (coluna 2)
    aSort(aClientes, , , {|x, y| x[2] > y[2]})
    ConOut("Primeiro decrescente: " + aClientes[1][2]) // "CARLOS"
Return`
  },
  {
    nome: "aSize",
    categoria: "Arrays",
    sintaxe: "aSize( <aArray>, <nNovoTam> )",
    retorno: "Array",
    descricaoCurta: "Redimensiona dinamicamente a quantidade de elementos de um array.",
    descricaoDetalhada: "Altera o tamanho do array informado para <nNovoTam>. Se o novo tamanho for menor, os elementos excedentes sao descartados. Se o novo tamanho for maior, novas posicoes sao preenchidas com valor NIL. Frequentemente combinada com aDel para remover posicoes fisicamente.",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Array que sera redimensionado.", opcional: false },
      { nome: "nNovoTam", tipo: "Numerico", descricao: "Nova quantidade total de elementos do array.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Pre-alocacao de memoria e ajuste fino de tamanho
User Function ExaSize()
    Local aDados := {"A", "B", "C", "D", "E"}

    // Reduz para 3 elementos (descarta D e E)
    aSize(aDados, 3)
    ConOut("Novo tamanho: " + cValToChar(Len(aDados))) // 3

    // Aumenta para 5 elementos (posicoes 4 e 5 serao NIL)
    aSize(aDados, 5)
    If aDados[4] == NIL
        ConOut("Posicao 4 inicializada com NIL com sucesso.")
    EndIf
Return`
  },
  {
    nome: "aDel",
    categoria: "Arrays",
    sintaxe: "aDel( <aArray>, <nPos> )",
    retorno: "Array",
    descricaoCurta: "Exclui logicamente um elemento na posicao indicada, deslocando os seguintes para a esquerda.",
    descricaoDetalhada: "Remove o elemento na posicao <nPos>, deslocando todos os elementos subsequentes uma posicao para a esquerda. ATENCAO: aDel nao diminui o tamanho do array; a ultima posicao fica com o valor NIL. Para reduzir o tamanho fisico do array, use aSize(aArray, Len(aArray) - 1) em seguida.",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Array onde o elemento sera removido.", opcional: false },
      { nome: "nPos", tipo: "Numerico", descricao: "Indice numerico do elemento a ser deletado.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Remocao correta de um elemento com aDel e aSize
User Function ExaDel()
    Local aCores := {"AZUL", "VERMELHO", "VERDE", "AMARELO"}

    // Removendo "VERMELHO" (posicao 2)
    aDel(aCores, 2)
    // Agora o array esta: {"AZUL", "VERDE", "AMARELO", NIL}

    // Redimensiona para eliminar fisicamente o ultimo elemento NIL
    aSize(aCores, Len(aCores) - 1)

    ConOut("Tamanho atual: " + cValToChar(Len(aCores))) // 3
    ConOut("Elemento na pos 2 agora: " + aCores[2])     // "VERDE"
Return`
  },
  {
    nome: "aTail",
    categoria: "Arrays",
    sintaxe: "aTail( <aArray> )",
    retorno: "Qualquer tipo (conteudo do ultimo elemento)",
    descricaoCurta: "Retorna o conteudo do ultimo elemento de um array sem remove-lo.",
    descricaoDetalhada: "Equivale a acessar aArray[Len(aArray)], porem de forma mais limpa, expressiva e segura. Se o array estiver vazio, retorna NIL.",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Array de onde sera retornado o ultimo item.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Obtencao do ultimo registro processado em fila/pilha
User Function ExaTail()
    Local aFila := {"Ordem 001", "Ordem 002", "Ordem 003"}
    Local cUltima := ""

    cUltima := aTail(aFila)
    ConOut("Ultima ordem na fila: " + cUltima) // "Ordem 003"
Return`
  },
  {
    nome: "aClone",
    categoria: "Arrays",
    sintaxe: "aClone( <aArray> )",
    retorno: "Array",
    descricaoCurta: "Cria e retorna uma copia exata e independente (deep copy) de um array.",
    descricaoDetalhada: "No ADVPL, atribuir um array a outra variavel (aB := aA) cria apenas uma referencia ao mesmo espaco de memoria. A funcao aClone realiza a copia em profundidade de todos os elementos e subarrays, permitindo alterar o clone sem afetar o array original.",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Array original a ser duplicado.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Backup de matriz antes de manipulacao em rotina de calculo
User Function ExaClone()
    Local aOriginal := {"A", "B", {"SUB1", "SUB2"}}
    Local aCopia    := aClone(aOriginal)

    // Alterando a copia
    aCopia[1] := "ALTERADO"
    aCopia[3][1] := "SUB_MODIFICADO"

    // O original permanece intacto
    ConOut("Original [1]: " + aOriginal[1])       // "A"
    ConOut("Copia [1]: " + aCopia[1])             // "ALTERADO"
    ConOut("Original [3][1]: " + aOriginal[3][1]) // "SUB1"
Return`
  },
  {
    nome: "aEval",
    categoria: "Arrays",
    sintaxe: "aEval( <aArray>, <bBloco>, [<nInicio>], [<nQtd>] )",
    retorno: "Array",
    descricaoCurta: "Executa um bloco de codigo para cada elemento do array.",
    descricaoDetalhada: "Itera sobre os elementos do vetor passando como argumentos para o code-block: o elemento corrente e o indice correspondente {|v, i| ...}. Ideal para somatorias, aplicacao de regras em lote e logs.",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Array que sera percorrido.", opcional: false },
      { nome: "bBloco", tipo: "Bloco de Codigo", descricao: "Code-block executado para cada elemento: {|v, i| ...}.", opcional: false },
      { nome: "nInicio", tipo: "Numerico", descricao: "Posicao inicial do percurso (padrao: 1).", opcional: true },
      { nome: "nQtd", tipo: "Numerico", descricao: "Quantidade de elementos a iterar.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Somatoria de totais de itens de pedido com aEval
User Function ExaEval()
    Local aPrecos := {10.50, 25.00, 14.50, 50.00}
    Local nTotal  := 0

    // Soma todos os precos do array de forma expressiva
    aEval(aPrecos, {|nValor| nTotal += nValor})
    ConOut("Valor Total Acumulado: R$ " + cValToChar(nTotal)) // 100.00

    // Exibicao de indices e valores
    aEval(aPrecos, {|nValor, nIdx| ConOut("Item " + cValToChar(nIdx) + ": " + cValToChar(nValor)) })
Return`
  },
  {
    nome: "aFill",
    categoria: "Arrays",
    sintaxe: "aFill( <aArray>, <expValor>, [<nInicio>], [<nQtd>] )",
    retorno: "Array",
    descricaoCurta: "Preenche elementos de um array com um valor especificado.",
    descricaoDetalhada: "Atribui o valor constante <expValor> a todos os elementos de <aArray> ou a uma fatia delimitada por <nInicio> e <nQtd>. Utilizada na inicializacao rapida de matrizes e buffers de campos.",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Array a ser preenchido.", opcional: false },
      { nome: "expValor", tipo: "Qualquer tipo", descricao: "Valor que preenchera as posicoes.", opcional: false },
      { nome: "nInicio", tipo: "Numerico", descricao: "Indice inicial para preenchimento (padrao: 1).", opcional: true },
      { nome: "nQtd", tipo: "Numerico", descricao: "Numero de posicoes a serem preenchidas.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Inicializacao de array de contadores zerados
User Function ExaFill()
    Local aContadores := Array(10) // Cria array de 10 posicoes com NIL

    // Preenche todas as posicoes com zero
    aFill(aContadores, 0)
    ConOut("Primeira posicao: " + cValToChar(aContadores[1])) // 0
    ConOut("Ultima posicao: " + cValToChar(aContadores[10]))  // 0
Return`
  },
  {
    nome: "aIns",
    categoria: "Arrays",
    sintaxe: "aIns( <aArray>, <nPos> )",
    retorno: "Array",
    descricaoCurta: "Insere uma nova posição vazia (NIL) em um índice determinado, deslocando os itens seguintes para a direita.",
    descricaoDetalhada: "Insere um novo elemento na posição <nPos> com valor NIL. O último elemento do array é descartado mantendo o tamanho original. Se desejar expandir o vetor sem perder o último elemento, chame aSize(aArray, Len(aArray) + 1) antes de aIns.",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Vetor onde a posição será inserida.", opcional: false },
      { nome: "nPos", tipo: "Numérico", descricao: "Posição (índice base 1) onde o novo elemento será alocado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Inserção de elemento em posição intermediária
User Function ExaIns()
    Local aItens := {"PRIMEIRO", "TERCEIRO", "QUARTO"}

    // Expande o tamanho do array antes de inserir
    aSize(aItens, Len(aItens) + 1)
    aIns(aItens, 2)
    aItens[2] := "SEGUNDO"

    ConOut("Posição 2: " + aItens[2]) // "SEGUNDO"
Return`
  },
  {
    nome: "aCopy",
    categoria: "Arrays",
    sintaxe: "aCopy( <aOrigem>, <aDestino>, [<nInicio>], [<nQtd>], [<nPosDest>] )",
    retorno: "Array (Vetor destino)",
    descricaoCurta: "Copia elementos de um array de origem para um array de destino preexistente.",
    descricaoDetalhada: "Transfere elementos entre arrays já inicializados. Permite definir o índice de início na origem, quantidade de posições a copiar e o índice inicial no destino.",
    parametros: [
      { nome: "aOrigem", tipo: "Array", descricao: "Vetor de origem dos dados.", opcional: false },
      { nome: "aDestino", tipo: "Array", descricao: "Vetor de destino preexistente.", opcional: false },
      { nome: "nInicio", tipo: "Numérico", descricao: "Posição inicial na origem (padrão: 1).", opcional: true },
      { nome: "nQtd", tipo: "Numérico", descricao: "Quantidade de elementos a copiar.", opcional: true },
      { nome: "nPosDest", tipo: "Numérico", descricao: "Posição inicial no array destino (padrão: 1).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Cópia parcial de elementos entre vetores
User Function ExaCopy()
    Local aOrigem  := {10, 20, 30, 40, 50}
    Local aDestino := Array(3)

    // Copia 3 elementos a partir da posição 2 para o destino
    aCopy(aOrigem, aDestino, 2, 3, 1)

    ConOut("Destino [1]: " + cValToChar(aDestino[1])) // 20
    ConOut("Destino [2]: " + cValToChar(aDestino[2])) // 30
    ConOut("Destino [3]: " + cValToChar(aDestino[3])) // 40
Return`
  },
  {
    nome: "aIgual",
    categoria: "Arrays",
    sintaxe: "aIgual( <aArray1>, <aArray2> )",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Verifica se dois arrays possuem exatamente a mesma estrutura, tamanho e conteúdos idênticos.",
    descricaoDetalhada: "Compara elemento por elemento de dois vetores, inclusive subarrays recursivos, retornando .T. se todos forem idênticos e .F. caso haja qualquer divergência.",
    parametros: [
      { nome: "aArray1", tipo: "Array", descricao: "Primeiro vetor a ser comparado.", opcional: false },
      { nome: "aArray2", tipo: "Array", descricao: "Segundo vetor a ser comparado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Comparação profunda de vetores
User Function ExaIgual()
    Local aVetorA := {"PROD01", 10.50, .T.}
    Local aVetorB := {"PROD01", 10.50, .T.}
    Local aVetorC := {"PROD01", 12.00, .T.}

    ConOut("A e B são iguais: " + cValToChar(aIgual(aVetorA, aVetorB))) // .T.
    ConOut("A e C são iguais: " + cValToChar(aIgual(aVetorA, aVetorC))) // .F.
Return`
  },
  {
    nome: "Eval",
    categoria: "Arrays",
    sintaxe: "Eval( <bCodeBlock>, [<xArg1>], [<xArg2>], ... )",
    retorno: "Qualquer tipo (Resultado retornado pela execução do bloco)",
    descricaoCurta: "Executa (avalia) um bloco de código passando argumentos opcionais e devolvendo o resultado.",
    descricaoDetalhada: "Mecanismo primordial da linguagem ADVPL para execução de funções de alta ordem e chamadas dinâmicas. Permite disparar codeblocks com parâmetros variáveis, amplamente utilizado em rotinas de busca, ordenação customizada, gatilhos e validações de interface.",
    parametros: [
      { nome: "bCodeBlock", tipo: "Bloco de Código", descricao: "Bloco de código a ser avaliado e executado.", opcional: false },
      { nome: "xArg1, xArg2...", tipo: "Qualquer tipo", descricao: "Argumentos passados como parâmetros para o bloco de código.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Execução dinâmica de cálculo com Eval
User Function ExEval()
    Local bCalculo := {|nPreco, nDesc| nPreco * (1 - (nDesc / 100))}
    Local nTotal   := Eval(bCalculo, 200, 15) // Aplica 15% de desconto em 200

    ConOut("Valor final calculado: " + cValToChar(nTotal)) // 170
Return`
  },
  {
    nome: "bSetGet",
    categoria: "Arrays",
    sintaxe: "bSetGet( <xVar> )",
    retorno: "Bloco de Código (Bloco de Get/Set da variável)",
    descricaoCurta: "Gera automaticamente um bloco de código de leitura e gravação (Get/Set) para a variável informada.",
    descricaoDetalhada: "Cria o bloco no formato {|u| If(PCount() > 0, xVar := u, xVar)}. Essencial na criação de controles visuais (TGet, TCheckBox, TComboBox) onde o componente necessita de um codeblock bidirecional para ler o valor inicial e atualizar a variável ao ser editada.",
    parametros: [
      { nome: "xVar", tipo: "Qualquer tipo", descricao: "Variável que será associada ao bloco Get/Set.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Associação bidirecional de variável com bSetGet
User Function ExbSetGet()
    Local cNome := "TOTVS"
    Local bGetSet := bSetGet(cNome)

    ConOut("Valor lido via Get: " + Eval(bGetSet)) // "TOTVS"
    Eval(bGetSet, "Novo Nome")
    ConOut("Valor atualizado via Set: " + Eval(bGetSet)) // "Novo Nome"
Return`
  },
  {
    nome: "Array",
    categoria: "Arrays",
    sintaxe: "Array( <nDim1>, [<nDim2>], ... )",
    retorno: "Array (Novo array alocado com as dimensões especificadas)",
    descricaoCurta: "Cria e dimensiona dinamicamente um novo array com uma ou mais dimensões preenchidas com NIL.",
    descricaoDetalhada: "Função nativa para alocação de matrizes multidimensionais no Protheus. Por exemplo, Array(10, 5) cria uma matriz de 10 linhas por 5 colunas com todos os elementos inicialmente inicializados como NIL.",
    parametros: [
      { nome: "nDim1", tipo: "Numérico", descricao: "Tamanho da primeira dimensão (quantidade de linhas).", opcional: false },
      { nome: "nDim2", tipo: "Numérico", descricao: "Tamanho da segunda dimensão (quantidade de colunas).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Criação e preenchimento de matriz bidimensional
User Function ExArray()
    Local aMatriz := Array(3, 2) // Matriz 3x2

    aMatriz[1][1] := "Linha 1 Coluna 1"
    aMatriz[1][2] := 100
    aMatriz[2][1] := "Linha 2 Coluna 1"
    aMatriz[2][2] := 200

    ConOut("Total de linhas: " + cValToChar(Len(aMatriz)))
Return`
  },
  {
    nome: "HMNew",
    categoria: "Arrays",
    sintaxe: "HMNew()",
    retorno: "Objeto / Identificador (Instância da tabela Hash/HashMap)",
    descricaoCurta: "Cria uma nova tabela Hash em memória (HashMap nativo) de altíssima performance para busca O(1).",
    descricaoDetalhada: "Recurso nativo do Protheus para armazenamento e busca de pares chave-valor em memória com complexidade O(1). Extremamente mais rápido do que arrays tradicionais manipulados com AScan() quando se trabalha com milhares de registros.",
    parametros: [],
    exemplo: `// Exemplo prático: Inicialização de tabela Hash de alta velocidade
User Function ExHMNew()
    Local oHash := HMNew()

    HMSet(oHash, "CLIENTE_01", "Acme Corporation")
    HMSet(oHash, "CLIENTE_02", "Globex Indústria")

    ConOut("Cliente 01: " + HMGet(oHash, "CLIENTE_01"))
Return`
  },
  {
    nome: "HMSet",
    categoria: "Arrays",
    sintaxe: "HMSet( <oHash>, <cKey>, <xValue> )",
    retorno: "Lógico (.T. se inserido/atualizado com sucesso, .F. caso contrário)",
    descricaoCurta: "Insere ou atualiza um par chave-valor dentro de uma tabela Hash (HashMap).",
    descricaoDetalhada: "Atribui o valor <xValue> (de qualquer tipo de dado: string, número, array, objeto) associado à chave textual <cKey> no HashMap fornecido. Se a chave já existir, seu valor anterior será sobrescrito.",
    parametros: [
      { nome: "oHash", tipo: "Objeto / Identificador", descricao: "Tabela Hash previamente criada com HMNew().", opcional: false },
      { nome: "cKey", tipo: "Caractere", descricao: "Chave identificadora textual do registro no HashMap.", opcional: false },
      { nome: "xValue", tipo: "Qualquer tipo", descricao: "Valor a ser armazenado sob a chave correspondente.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Armazenamento de dados complexos em Hash
User Function ExHMSet()
    Local oMap := HMNew()
    Local aPrecos := {15.50, 18.90, 22.00}

    HMSet(oMap, "PROD_A", aPrecos)
    HMSet(oMap, "STATUS", .T.)
    ConOut("Valores inseridos no mapa com sucesso.")
Return`
  },
  {
    nome: "HMGet",
    categoria: "Arrays",
    sintaxe: "HMGet( <oHash>, <cKey>, [<xDefault>] )",
    retorno: "Qualquer tipo (Valor associado à chave ou xDefault se não localizada)",
    descricaoCurta: "Recupera instantaneamente em tempo constante O(1) o valor associado a uma chave na tabela Hash.",
    descricaoDetalhada: "Busca no HashMap o valor armazenado sob a chave <cKey>. Caso a chave não exista no mapa, retorna o valor padrão opcional <xDefault> ou NIL, eliminando laços de repetição lentos em grandes massas de dados.",
    parametros: [
      { nome: "oHash", tipo: "Objeto / Identificador", descricao: "Tabela Hash onde a busca será executada.", opcional: false },
      { nome: "cKey", tipo: "Caractere", descricao: "Chave textual cujo valor associado será retornado.", opcional: false },
      { nome: "xDefault", tipo: "Qualquer tipo", descricao: "Valor padrão retornado se a chave não for localizada.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Busca ultrarrápida O(1) de cadastro via HashMap
User Function ExHMGet()
    Local oTabela := HMNew()

    HMSet(oTabela, "001", "Filial Matriz - SP")
    HMSet(oTabela, "002", "Filial Filial - RJ")

    ConOut("Filial 001: " + HMGet(oTabela, "001"))
    ConOut("Filial 999: " + HMGet(oTabela, "999", "NÃO ENCONTRADA"))
Return`
  }
);

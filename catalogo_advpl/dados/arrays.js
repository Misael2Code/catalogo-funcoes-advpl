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
  }
);

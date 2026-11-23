/**
 * Catalogo de Funcoes ADVPL - Modulo Strings
 * Funcoes essenciais para manipulacao de texto e strings
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "StrTran",
    categoria: "Strings",
    sintaxe: "StrTran( <cString>, <cProcura>, [<cSubst>], [<nInicio>], [<nOcorr>] )",
    retorno: "Caractere (String)",
    descricaoCurta: "Substitui ocorrencias de uma substring dentro de uma cadeia de caracteres por outra substring.",
    descricaoDetalhada: "Pesquisa uma determinada cadeia de caracteres em uma string e a substitui por outra. Se <cSubst> for omitido, a substring encontrada sera excluida. Permite definir a partir de qual ocorrencia comecar (<nInicio>) e quantas ocorrencias substituir (<nOcorr>).",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Cadeia de caracteres original onde a busca sera feita.", opcional: false },
      { nome: "cProcura", tipo: "Caractere", descricao: "Substring a ser pesquisada para substituicao.", opcional: false },
      { nome: "cSubst", tipo: "Caractere", descricao: "Nova substring que substituira cProcura. Se omitido, cProcura e removida.", opcional: true },
      { nome: "nInicio", tipo: "Numerico", descricao: "Numero da ocorrencia a partir da qual iniciar a substituicao (padrao: 1).", opcional: true },
      { nome: "nOcorr", tipo: "Numerico", descricao: "Quantidade de ocorrencias a serem substituidas (padrao: todas).", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Substituicao de textos e remocao de caracteres
User Function ExStrTran()
    Local cTexto    := "TOTVS Protheus 12 - Modulo Protheus Faturamento"
    Local cNovoTxt  := ""
    Local cMascara  := "123.456.789-00"
    Local cSemPonto := ""

    // 1. Substitui todas as ocorrencias de "Protheus" por "ERP"
    cNovoTxt := StrTran(cTexto, "Protheus", "ERP")
    ConOut("Texto Alterado: " + cNovoTxt)
    // Saida: "TOTVS ERP 12 - Modulo ERP Faturamento"

    // 2. Remove formatacao de CPF substituindo pontos e tracos por vazio
    cSemPonto := StrTran(cMascara, ".", "")
    cSemPonto := StrTran(cSemPonto, "-", "")
    ConOut("CPF limpo: " + cSemPonto) // "12345678900"

    // 3. Substitui apenas a 2a ocorrencia
    cNovoTxt := StrTran(cTexto, "Protheus", "ERP", 2, 1)
    ConOut("Apenas 2a ocorrencia: " + cNovoTxt)
Return`
  },
  {
    nome: "PadL",
    categoria: "Strings",
    sintaxe: "PadL( <exp>, <nTam>, [<cCarac>] )",
    retorno: "Caractere (String)",
    descricaoCurta: "Alinha uma expressao a direita, preenchendo o espaco restante a esquerda com caracteres especificos.",
    descricaoDetalhada: "Converte a expressao informada em string (se necessario) e alinha o conteudo a direita, preenchendo as posicoes restantes a esquerda com o caractere especificado (padrao: espaco em branco). Muito utilizado para formatacao de codigos numericos e alinhamentos de relatorios.",
    parametros: [
      { nome: "exp", tipo: "Caractere / Numerico / Data", descricao: "Expressao ou valor a ser preenchido e alinhado.", opcional: false },
      { nome: "nTam", tipo: "Numerico", descricao: "Comprimento total final da string resultante.", opcional: false },
      { nome: "cCarac", tipo: "Caractere", descricao: "Caractere de preenchimento (padrao: espaco em branco).", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Preenchimento com zeros a esquerda e alinhamento
User Function ExPadL()
    Local cCodigo   := "458"
    Local cFormat   := ""
    Local cColuna   := ""

    // Preenche com zeros a esquerda para completar 6 digitos (ex: codigo de cliente)
    cFormat := PadL(cCodigo, 6, "0")
    ConOut("Codigo Formatado: " + cFormat) // "000458"

    // Alinhamento numerico em relatorios txt com espacos
    cColuna := PadL("1.520,30", 15)
    ConOut("Valor Alinhado: [" + cColuna + "]")
Return`
  },
  {
    nome: "PadR",
    categoria: "Strings",
    sintaxe: "PadR( <exp>, <nTam>, [<cCarac>] )",
    retorno: "Caractere (String)",
    descricaoCurta: "Alinha uma expressao a esquerda, preenchendo o espaco restante a direita com caracteres especificos.",
    descricaoDetalhada: "Converte a expressao informada para string e alinha o texto a esquerda, preenchendo o restante das posicoes a direita ate atingir o comprimento total informado. Utilizado para campos de largura fixa e geracao de arquivos CNAB/EDI.",
    parametros: [
      { nome: "exp", tipo: "Caractere / Numerico / Data", descricao: "Expressao a ser preenchida e alinhada.", opcional: false },
      { nome: "nTam", tipo: "Numerico", descricao: "Comprimento total da string resultante.", opcional: false },
      { nome: "cCarac", tipo: "Caractere", descricao: "Caractere de preenchimento (padrao: espaco em branco).", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Geracao de campos de tamanho fixo para arquivo TXT
User Function ExPadR()
    Local cNomeCli := "MERCADO MODELO LTDA"
    Local cRegistro:= ""

    // Preenche com espacos a direita ate 40 caracteres (layout CNAB)
    cRegistro := PadR(cNomeCli, 40)
    ConOut("Linha Fixa: [" + cRegistro + "] (Tam: " + cValToChar(Len(cRegistro)) + ")")

    // Preenchimento com caracteres visuais (ex: tracos decorativos)
    ConOut(PadR("DADOS DO CLIENTE ", 35, "-"))
Return`
  },
  {
    nome: "PadC",
    categoria: "Strings",
    sintaxe: "PadC( <exp>, <nTam>, [<cCarac>] )",
    retorno: "Caractere (String)",
    descricaoCurta: "Centraliza uma expressao dentro de uma largura especificada, preenchendo ambos os lados.",
    descricaoDetalhada: "Centraliza o texto resultante da expressao no espaco definido por <nTam>, distribuindo igualmente os caracteres de preenchimento a esquerda e a direita. Muito utilizado na criacao de cabecalhos de impressao e logs.",
    parametros: [
      { nome: "exp", tipo: "Caractere / Numerico / Data", descricao: "Expressao ou texto a ser centralizado.", opcional: false },
      { nome: "nTam", tipo: "Numerico", descricao: "Comprimento total da linha/string desejada.", opcional: false },
      { nome: "cCarac", tipo: "Caractere", descricao: "Caractere usado para preencher as laterais (padrao: espaco).", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Cabecalho centralizado em logs e relatorios
User Function ExPadC()
    Local cTitulo := "RELATORIO DE FATURAMENTO MENSAL"
    Local cCabec1 := PadC(cTitulo, 60, "=")
    Local cCabec2 := PadC("EMPRESA MODELO S.A.", 60, " ")

    ConOut(cCabec1)
    ConOut(cCabec2)
    ConOut(PadC("", 60, "-"))
Return`
  },
  {
    nome: "Len",
    categoria: "Strings",
    sintaxe: "Len( <exp> )",
    retorno: "Numerico",
    descricaoCurta: "Retorna o numero de caracteres em uma string ou a quantidade de elementos em um array.",
    descricaoDetalhada: "Funcao polimorfica essencial no ADVPL. Quando aplicada sobre uma string, retorna o total de caracteres (incluindo espacos). Quando aplicada sobre um array, retorna o numero de posicoes/elementos do vetor.",
    parametros: [
      { nome: "exp", tipo: "Caractere / Array", descricao: "Cadeia de caracteres ou vetor a ser mensurado.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Validacao de tamanho de string e contagem de array
User Function ExLen()
    Local cChaveNFe := "35261112345678000195550010000000011000000010"
    Local aItens    := {"Item 1", "Item 2", "Item 3", "Item 4"}

    If Len(cChaveNFe) == 44
        ConOut("Chave da NFe valida com 44 digitos.")
    Else
        ConOut("Chave da NFe invalida! Tamanho: " + cValToChar(Len(cChaveNFe)))
    EndIf

    ConOut("Quantidade de itens no array: " + cValToChar(Len(aItens)))
Return`
  },
  {
    nome: "Upper",
    categoria: "Strings",
    sintaxe: "Upper( <cString> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Converte todas as letras minusculas de uma cadeia de caracteres em letras maiusculas.",
    descricaoDetalhada: "Converte todos os caracteres alfabeticos minusculos para maiusculos. Fundamental antes de gravacoes no banco de dados Protheus ou buscas por indices para evitar divergencias de Case Sensitivity.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Texto a ser convertido para maiusculas.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Padronizacao de dados para consulta e gravacao
User Function ExUpper()
    Local cEntrada := "protheus faturamento microsiga"
    Local cTratado := Upper(cEntrada)

    ConOut("Texto em maiusculo: " + cTratado) // "PROTHEUS FATURAMENTO MICROSIGA"

    // Uso tipico em comparacoes sem importar maiusculas/minusculas
    If Upper(AllTrim("ativo")) == "ATIVO"
        ConOut("Status confirmado com sucesso.")
    EndIf
Return`
  },
  {
    nome: "Lower",
    categoria: "Strings",
    sintaxe: "Lower( <cString> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Converte todas as letras maiusculas de uma cadeia de caracteres em letras minusculas.",
    descricaoDetalhada: "Converte todos os caracteres alfabeticos maiusculos da string para minusculos. Frequentemente utilizada na formatacao de enderecos de e-mail, nomes de usuarios e integracoes de web services/JSON.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Texto a ser convertido para letras minusculas.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Padronizacao de e-mail de contato
User Function ExLower()
    Local cEmailOriginal := "JOAO.SILVA@FORNECEDOR.COM.BR"
    Local cEmailFormat   := Lower(AllTrim(cEmailOriginal))

    ConOut("E-mail tratado: " + cEmailFormat)
    // Saida: "joao.silva@fornecedor.com.br"
Return`
  },
  {
    nome: "AllTrim",
    categoria: "Strings",
    sintaxe: "AllTrim( <cString> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Remove todos os espacos em branco iniciais e finais de uma cadeia de caracteres.",
    descricaoDetalhada: "Elimina espacos vazios localizados tanto a esquerda quanto a direita da string. Indispensavel no Protheus, pois os campos tipo Caractere no banco de dados possuem tamanho fixo e retornam preenchidos com espacos a direita.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Cadeia de caracteres a ser limpa.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Limpeza de campos vindos das tabelas do Protheus
User Function ExAllTrim()
    Local cNomeCli := "   SUPERMERCADOS ALVORADA S/A        "
    Local cLimpo   := AllTrim(cNomeCli)

    ConOut("Comprimento original: " + cValToChar(Len(cNomeCli))) // 37
    ConOut("Comprimento limpo: " + cValToChar(Len(cLimpo)))       // 30
    ConOut("Nome limpo: [" + cLimpo + "]")
Return`
  },
  {
    nome: "SubStr",
    categoria: "Strings",
    sintaxe: "SubStr( <cString>, <nInicio>, [<nTam>] )",
    retorno: "Caractere (String)",
    descricaoCurta: "Extrai e retorna uma subcadeia de caracteres a partir de uma posicao inicial.",
    descricaoDetalhada: "Copia um pedaco da string <cString> comecando no indice <nInicio> (base 1 no ADVPL). Se <nTam> nao for informado, extrai todos os caracteres restantes ate o fim da cadeia.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Cadeia de caracteres de onde o trecho sera extraido.", opcional: false },
      { nome: "nInicio", tipo: "Numerico", descricao: "Posicao inicial da extracao (comecando em 1).", opcional: false },
      { nome: "nTam", tipo: "Numerico", descricao: "Quantidade de caracteres a extrair. Se omitido, copia ate o final.", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Decomposicao de codigo estruturado de produto
User Function ExSubStr()
    Local cCodProd   := "EL-00452-REV2"
    Local cFamilia   := SubStr(cCodProd, 1, 2)  // "EL"
    Local cSequencia := SubStr(cCodProd, 4, 5)  // "00452"
    Local cVersao    := SubStr(cCodProd, 10)    // "REV2"

    ConOut("Familia do Produto: " + cFamilia)
    ConOut("Sequencia numerica: " + cSequencia)
    ConOut("Versao de Revisao: " + cVersao)
Return`
  },
  {
    nome: "At",
    categoria: "Strings",
    sintaxe: "At( <cBusca>, <cString>, [<nInicio>] )",
    retorno: "Numerico",
    descricaoCurta: "Retorna a posicao numerica da primeira ocorrencia de uma substring em uma string.",
    descricaoDetalhada: "Pesquisa a primeira ocorrencia da substring <cBusca> dentro de <cString>. Retorna um numero inteiro indicando a posicao onde ela comeca (base 1). Retorna 0 caso a substring nao seja encontrada.",
    parametros: [
      { nome: "cBusca", tipo: "Caractere", descricao: "Texto a ser localizado.", opcional: false },
      { nome: "cString", tipo: "Caractere", descricao: "Cadeia onde a busca sera efetuada.", opcional: false },
      { nome: "nInicio", tipo: "Numerico", descricao: "Indice a partir do qual comecar a busca (padrao: 1).", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Localizacao de delimitador em string composta
User Function ExAt()
    Local cEmail := "contato.financeiro@empresa.com.br"
    Local nPosArroba := At("@", cEmail)
    Local cUsuario   := ""
    Local cDominio   := ""

    If nPosArroba > 0
        cUsuario := SubStr(cEmail, 1, nPosArroba - 1)
        cDominio := SubStr(cEmail, nPosArroba + 1)
        ConOut("Usuario: " + cUsuario)
        ConOut("Dominio: " + cDominio)
    Else
        ConOut("E-mail invalido, caractere @ nao encontrado!")
    EndIf
Return`
  },
  {
    nome: "Rat",
    categoria: "Strings",
    sintaxe: "Rat( <cBusca>, <cString> )",
    retorno: "Numerico",
    descricaoCurta: "Retorna a posicao da ultima ocorrencia de uma substring dentro de uma cadeia de caracteres.",
    descricaoDetalhada: "Executa uma busca da direita para a esquerda (Right At), retornando o indice numerico da ultima ocorrencia da substring pesquisada. Muito utilizada para obter extensoes de arquivos ou nomes apos a ultima barra de diretorio.",
    parametros: [
      { nome: "cBusca", tipo: "Caractere", descricao: "Substring procurada.", opcional: false },
      { nome: "cString", tipo: "Caractere", descricao: "Texto onde a busca sera realizada.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Extracao de nome de arquivo e extensao a partir de caminho completo
User Function ExRat()
    Local cFullPath   := "C:\\TOTVS\\PROTHEUS\\DATA\\SXS\\SX6990.DTC"
    Local nUltimaBarra:= Rat("\\", cFullPath)
    Local nUltimoPonto:= Rat(".", cFullPath)
    Local cNomeArq    := ""
    Local cExtensao   := ""

    cNomeArq  := SubStr(cFullPath, nUltimaBarra + 1)
    cExtensao := SubStr(cFullPath, nUltimoPonto + 1)

    ConOut("Arquivo: " + cNomeArq)   // "SX6990.DTC"
    ConOut("Extensao: " + cExtensao) // "DTC"
Return`
  },
  {
    nome: "Stuff",
    categoria: "Strings",
    sintaxe: "Stuff( <cString>, <nInicio>, <nDeleta>, <cInsere> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Insere, substitui ou deleta caracteres em uma posicao especifica de uma string.",
    descricaoDetalhada: "Manipula uma string apagando <nDeleta> caracteres a partir da posicao <nInicio> e inserindo <cInsere> nessa mesma posicao. Se <nDeleta> for 0, atua como pura insercao. Se <cInsere> for string vazia, atua como remocao.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Cadeia original de caracteres.", opcional: false },
      { nome: "nInicio", tipo: "Numerico", descricao: "Posicao inicial da modificacao.", opcional: false },
      { nome: "nDeleta", tipo: "Numerico", descricao: "Quantidade de caracteres a serem removidos.", opcional: false },
      { nome: "cInsere", tipo: "Caractere", descricao: "Texto a ser inserido na posicao.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Formatacao dinamica de mascara de CEP
User Function ExStuff()
    Local cCEP     := "01310100" // Formato sem mascara
    Local cCEPFmt  := ""

    // Insere o traco separador na posicao 6 sem deletar nada
    cCEPFmt := Stuff(cCEP, 6, 0, "-")
    ConOut("CEP Formatado: " + cCEPFmt) // "01310-100"

    // Substituindo texto: troca 'ABC' por 'XYZ'
    Local cCodigo := "COD-ABC-2026"
    cCodigo := Stuff(cCodigo, 5, 3, "XYZ")
    ConOut("Codigo alterado: " + cCodigo) // "COD-XYZ-2026"
Return`
  },
  {
    nome: "StrZero",
    categoria: "Strings",
    sintaxe: "StrZero( <nNumero>, <nTam>, [<nDecimais>] )",
    retorno: "Caractere (String)",
    descricaoCurta: "Converte um numero em string preenchida com zeros a esquerda ate o tamanho especificado.",
    descricaoDetalhada: "Funcao padrao do ecossistema Protheus para formatacao de codigos e sequenciais que necessitam de zeros a esquerda (como numero de notas fiscais, pedidos e itens).",
    parametros: [
      { nome: "nNumero", tipo: "Numerico", descricao: "Valor numerico a ser convertido.", opcional: false },
      { nome: "nTam", tipo: "Numerico", descricao: "Quantidade total de caracteres da string final.", opcional: false },
      { nome: "nDecimais", tipo: "Numerico", descricao: "Numero de casas decimais (padrao: 0).", opcional: true }
    ],
    exemplo: `// Exemplo pratico: Geracao de numero de Nota Fiscal e Item de Pedido
User Function ExStrZero()
    Local nNumDoc := 1420
    Local nItem   := 1
    Local cDocFmt := ""
    Local cItemFmt:= ""

    // Numero de documento com 9 posicoes
    cDocFmt := StrZero(nNumDoc, 9)
    ConOut("Documento: " + cDocFmt) // "000001420"

    // Item de pedido com 4 posicoes (padrao SC6/SD2)
    cItemFmt := StrZero(nItem, 4)
    ConOut("Item: " + cItemFmt) // "0001"
Return`
  },
  {
    nome: "cValToChar",
    categoria: "Strings",
    sintaxe: "cValToChar( <exp> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Converte qualquer valor de tipo basico (numerico, data, logico) em string sem formatacao especial.",
    descricaoDetalhada: "Converte valores numericos, logicos (.T./.F.) ou datas para o tipo caractere. Essencial para concatenacao em mensagens, logs no ConOut e construcao de clausulas de consulta sem risco de erro de tipos incompatíveis.",
    parametros: [
      { nome: "exp", tipo: "Qualquer tipo basico", descricao: "Valor numerico, logico, data ou caractere a ser convertido.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Concatenacao segura de varios tipos em log de erro
User Function ExcValToChar()
    Local nSaldo  := 450.80
    Local lBloq   := .F.
    Local dUltMov := Date()
    Local cMensagem := ""

    cMensagem := "Saldo: R$ " + cValToChar(nSaldo) + ;
                 " | Bloqueado: " + cValToChar(lBloq) + ;
                 " | Data: " + cValToChar(dUltMov)

    ConOut(cMensagem)
    // Saida: Saldo: R$ 450.8 | Bloqueado: .F. | Data: 23/11/26
Return`
  },
  {
    nome: "Val",
    categoria: "Strings",
    sintaxe: "Val( <cString> )",
    retorno: "Numerico",
    descricaoCurta: "Converte uma cadeia de caracteres contendo digitos em um valor numerico nativo.",
    descricaoDetalhada: "Analisa uma string de caracteres a partir da esquerda e converte os digitos em um numero do tipo Numerico (N). A conversao para quando encontra o primeiro caractere nao numerico (exceto sinal de menos inicial e ponto decimal).",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "String contendo digitos a ser convertida.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Calculo a partir de valores lidos de campos de texto ou XML
User Function ExVal()
    Local cQtdTxt  := "150"
    Local cPrecoTxt:= "12.75"
    Local nQtd     := Val(cQtdTxt)
    Local nPreco   := Val(cPrecoTxt)
    Local nTotal   := nQtd * nPreco

    ConOut("Total calculado: R$ " + cValToChar(nTotal)) // 1912.50
Return`
  },
  {
    nome: "Transform",
    categoria: "Strings",
    sintaxe: "Transform( <exp>, <cPicture> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Formata uma expressao numerica ou texto segundo uma mascara predefinida (picture).",
    descricaoDetalhada: "Aplica regras de picture de formatacao ADVPL/Clipper sobre o valor. Suporta mascaras de valor monetario (@E 999,999.99), CPF/CNPJ (@R 99.999.999/9999-99), datas e formatos customizados.",
    parametros: [
      { nome: "exp", tipo: "Numerico / Caractere", descricao: "Valor a ser formatado.", opcional: false },
      { nome: "cPicture", tipo: "Caractere", descricao: "Mascara de formatacao contendo funcoes @ e modelos 9, X, !, etc.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Formatacao de moeda brasileira e documentos
User Function ExTransform()
    Local nTotalNF := 458920.45
    Local cCNPJ    := "01234567000189"
    Local cMoeda   := ""
    Local cDocFmt  := ""

    // Formatacao de moeda padrao brasileiro (@E inverte virgula e ponto)
    cMoeda := Transform(nTotalNF, "@E 999,999,999.99")
    ConOut("Total da Nota: R$ " + cMoeda) // "Total da Nota: R$ 458.920,45"

    // Formatacao de CNPJ com @R (mascara com caracteres literais)
    cDocFmt := Transform(cCNPJ, "@R 99.999.999/9999-99")
    ConOut("CNPJ Formatado: " + cDocFmt) // "01.234.567/0001-89"
Return`
  }
);

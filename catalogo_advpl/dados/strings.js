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
  },
  {
    nome: "Left",
    categoria: "Strings",
    sintaxe: "Left( <cString>, <nTam> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Retorna a quantidade especificada de caracteres a partir do início (esquerda) de uma string.",
    descricaoDetalhada: "Extrai os primeiros <nTam> caracteres da cadeia de caracteres. Equivale funcionalmente a SubStr(cString, 1, nTam).",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Cadeia de caracteres de onde o trecho inicial será extraído.", opcional: false },
      { nome: "nTam", tipo: "Numérico", descricao: "Quantidade de caracteres a serem extraídos da esquerda para a direita.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Obtenção de prefixo ou código de UF
User Function ExLeft()
    Local cChave := "35261112345678000195550010000000011000000010"
    Local cUF    := Left(cChave, 2) // "35" (SP)

    ConOut("Código UF extraído da NFe: " + cUF)
Return`
  },
  {
    nome: "Right",
    categoria: "Strings",
    sintaxe: "Right( <cString>, <nTam> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Retorna a quantidade especificada de caracteres a partir do final (direita) de uma string.",
    descricaoDetalhada: "Extrai os últimos <nTam> caracteres de uma cadeia de texto a partir de sua extremidade direita.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Cadeia de caracteres de onde o trecho final será extraído.", opcional: false },
      { nome: "nTam", tipo: "Numérico", descricao: "Quantidade de caracteres finais a serem extraídos.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Identificação de extensão de arquivo
User Function ExRight()
    Local cArquivo  := "RELATORIO_GERENCIAL.PDF"
    Local cExtensao := Right(cArquivo, 3) // "PDF"

    ConOut("Extensão do documento: " + cExtensao)
Return`
  },
  {
    nome: "Replicate",
    categoria: "Strings",
    sintaxe: "Replicate( <cString>, <nRepeticoes> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Repete uma cadeia de caracteres uma quantidade especificada de vezes.",
    descricaoDetalhada: "Cria uma nova string concatenando <cString> tantas vezes quanto indicado em <nRepeticoes>. Amplamente empregada em linhas divisórias, separadores de relatórios e preenchimentos textuais.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Caractere ou texto a ser repetido.", opcional: false },
      { nome: "nRepeticoes", tipo: "Numérico", descricao: "Quantidade de vezes que o texto será replicado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Criação de linha separadora em relatórios
User Function ExReplicate()
    Local cDivisoria := Replicate("=", 50)

    ConOut(cDivisoria)
    ConOut("CABECALHO DO RELATORIO FINANCEIRO")
    ConOut(cDivisoria)
Return`
  },
  {
    nome: "Space",
    categoria: "Strings",
    sintaxe: "Space( <nEspacos> )",
    retorno: "Caractere (String contendo apenas espaços)",
    descricaoCurta: "Gera e retorna uma string contendo uma quantidade especificada de espaços em branco.",
    descricaoDetalhada: "Cria uma cadeia de caracteres composta exclusivamente por <nEspacos> espaços vazios. Usada na inicialização de variáveis vinculadas a campos Protheus de largura fixa e dimensionamento de buffers.",
    parametros: [
      { nome: "nEspacos", tipo: "Numérico", descricao: "Quantidade de espaços em branco a gerar.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Inicialização de buffer de campo
User Function ExSpace()
    Local cNomeVazio := Space(40) // 40 espaços (tamanho padrão A1_NOME)

    ConOut("Comprimento da variável: " + cValToChar(Len(cNomeVazio))) // 40
Return`
  },
  {
    nome: "NoAcento",
    categoria: "Strings",
    sintaxe: "NoAcento( <cString> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Remove acentos e caracteres especiais gráficos de uma cadeia de caracteres, substituindo-os por letras simples.",
    descricaoDetalhada: "Converte caracteres acentuados (á, é, í, ó, ú, ç, ã, etc.) para suas formas não acentuadas (a, e, i, o, u, c, a). Tradicionalmente utilizada na geração de arquivos de remessa bancária, SEFAZ e integração contábil.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Texto contendo acentuação a ser normalizado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Remoção de acentuação para arquivos de remessa
User Function ExNoAcento()
    Local cOriginal := "João da Conceição & Filhos Ltda - São Paulo"
    Local cLimpo    := NoAcento(cOriginal)

    ConOut("Texto sem acento: " + cLimpo)
    // "Joao da Conceicao & Filhos Ltda - Sao Paulo"
Return`
  },
  {
    nome: "FwNoAccent",
    categoria: "Strings",
    sintaxe: "FwNoAccent( <cTexto> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Função moderna do Framework TOTVS para remoção abrangente de acentos e caracteres especiais.",
    descricaoDetalhada: "Evolução da função NoAcento(). Oferece suporte completo a UTF-8 e tabelas Unicode estendidas, garantindo limpeza precisa para payloads de API REST e integração com cloud.",
    parametros: [
      { nome: "cTexto", tipo: "Caractere", descricao: "Texto com acentos a ser tratado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Normalização moderna de caracteres no Framework Protheus
User Function ExFwNoAccent()
    Local cDescricao := "PRODUÇÃO AGRÍCOLA - CANA-DE-AÇÚCAR"
    Local cTratado   := FwNoAccent(cDescricao)

    ConOut("Resultado FW: " + cTratado)
    // "PRODUCAO AGRICOLA - CANA-DE-ACUCAR"
Return`
  },
  {
    nome: "StrTokArr",
    categoria: "Strings",
    sintaxe: "StrTokArr( <cString>, <cDelimitador> )",
    retorno: "Array (Vetor de strings)",
    descricaoCurta: "Divide uma cadeia de caracteres em um array com base em um caractere delimitador (Split).",
    descricaoDetalhada: "Converte uma string delimitada (como CSV, chaves compostas ou listas separadas por ponto-e-vírgula) em um array unidimensional onde cada posição corresponde a um elemento separado.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Texto a ser fragmentado.", opcional: false },
      { nome: "cDelimitador", tipo: "Caractere", descricao: "Caractere ou sequência usada como separador (ex: ';', ',', '|').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Divisão de linha CSV em vetor de campos
User Function ExStrTokArr()
    Local cLinhaCSV := "0001;MOUSE OPTICO;45.90;10"
    Local aCampos   := StrTokArr(cLinhaCSV, ";")

    ConOut("Código: " + aCampos[1])      // "0001"
    ConOut("Descrição: " + aCampos[2])   // "MOUSE OPTICO"
    ConOut("Preço: " + aCampos[3])       // "45.90"
Return`
  },
  {
    nome: "ArrTokStr",
    categoria: "Strings",
    sintaxe: "ArrTokStr( <aArray>, [<cDelimitador>] )",
    retorno: "Caractere (String)",
    descricaoCurta: "Une os elementos de um array em uma única string separados por um delimitador (Join).",
    descricaoDetalhada: "Inverso de StrTokArr(). Concatena todos os elementos do vetor utilizando o caractere delimitador informado (padrão: vírgula).",
    parametros: [
      { nome: "aArray", tipo: "Array", descricao: "Vetor de elementos a serem unidos.", opcional: false },
      { nome: "cDelimitador", tipo: "Caractere", descricao: "Separador entre os elementos (padrão: ',').", opcional: true }
    ],
    exemplo: `// Exemplo prático: Junção de elementos de vetor em string separada por barras
User Function ExArrTokStr()
    Local aCores := {"AZUL", "VERDE", "VERMELHO", "AMARELO"}
    Local cLista := ArrTokStr(aCores, " | ")

    ConOut("Lista unida: " + cLista)
    // "AZUL | VERDE | VERMELHO | AMARELO"
Return`
  },
  {
    nome: "IsDigit",
    categoria: "Strings",
    sintaxe: "IsDigit( <cString> )",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Verifica se o primeiro caractere de uma cadeia de caracteres é um dígito numérico (0 a 9).",
    descricaoDetalhada: "Retorna .T. se o caractere inicial for um número entre 0 e 9; retorna .F. se for letra, espaço ou símbolo especial.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "String a ser avaliada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Validação se código inicia por número
User Function ExIsDigit()
    Local cValor1 := "987ABC"
    Local cValor2 := "ABC987"

    ConOut("Começa com dígito: " + cValToChar(IsDigit(cValor1))) // .T.
    ConOut("Começa com dígito: " + cValToChar(IsDigit(cValor2))) // .F.
Return`
  },
  {
    nome: "Str",
    categoria: "Strings",
    sintaxe: "Str( <nNumero>, [<nTamanho>], [<nDecimais>] )",
    retorno: "Caractere (String com a representação formatada do número)",
    descricaoCurta: "Converte um valor numérico em sua representação string com controle de tamanho total e decimais.",
    descricaoDetalhada: "Transforma valores numéricos em string, permitindo especificar o comprimento total do texto resultante (com preenchimento de espaços à esquerda) e o número de casas decimais após o ponto.",
    parametros: [
      { nome: "nNumero", tipo: "Numérico", descricao: "Valor numérico a ser convertido.", opcional: false },
      { nome: "nTamanho", tipo: "Numérico", descricao: "Comprimento total da string gerada. Padrão: 10.", opcional: true },
      { nome: "nDecimais", tipo: "Numérico", descricao: "Quantidade de casas decimais. Padrão: 0.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Conversão e formatação numérica com Str
User Function ExStr()
    Local nValor := 125.758

    ConOut("[" + Str(nValor) + "]")          // "       126" (arredondado, tamanho padrão 10)
    ConOut("[" + Str(nValor, 8, 2) + "]")    // "  125.76" (tamanho 8, 2 decimais)
    ConOut("[" + AllTrim(Str(nValor, 10, 2)) + "]") // "125.76"
Return`
  },
  {
    nome: "Asc",
    categoria: "Strings",
    sintaxe: "Asc( <cString> )",
    retorno: "Numérico (Código ASCII de 0 a 255)",
    descricaoCurta: "Retorna o código ASCII numérico correspondente ao primeiro caractere de uma string.",
    descricaoDetalhada: "Obtém o valor decimal da tabela ASCII do primeiro caractere da cadeia fornecida. Retorna 0 caso a string seja vazia.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "String cujo caractere inicial será avaliado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Identificação de código ASCII
User Function ExAsc()
    Local cLetra := "A"

    ConOut("Código ASCII de 'A': " + cValToChar(Asc(cLetra))) // 65
    ConOut("Código ASCII de 'a': " + cValToChar(Asc("a")))    // 97
Return`
  },
  {
    nome: "Chr",
    categoria: "Strings",
    sintaxe: "Chr( <nCodigoAscii> )",
    retorno: "Caractere (String de 1 caractere correspondente)",
    descricaoCurta: "Retorna o caractere correspondente ao código numérico ASCII informado.",
    descricaoDetalhada: "Converte um valor numérico inteiro (de 0 a 255) no respectivo caractere da tabela ASCII. Muito utilizado para inserção de caracteres de controle como tabulação (Chr(9)), quebra de linha (Chr(13)+Chr(10)) e aspas (Chr(34)).",
    parametros: [
      { nome: "nCodigoAscii", tipo: "Numérico", descricao: "Código numérico ASCII decimal (0 a 255).", opcional: false }
    ],
    exemplo: `// Exemplo prático: Construção de string com tabulação e aspas via Chr
User Function ExChr()
    Local cTab   := Chr(9)
    Local cAspas := Chr(34)
    Local cTexto := "Coluna 1" + cTab + "Coluna 2" + cTab + cAspas + "Valor entre aspas" + cAspas

    ConOut(cTexto)
Return`
  },
  {
    nome: "Trim",
    categoria: "Strings",
    sintaxe: "Trim( <cString> )",
    retorno: "Caractere (String sem espaços à direita)",
    descricaoCurta: "Remove todos os espaços em branco presentes no final (lado direito) de uma string.",
    descricaoDetalhada: "Função clássica de manipulação de texto em ADVPL equivalente ao RTrim(). Elimina os espaços excedentes à direita gerados por campos de tamanho fixo do banco de dados.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "String a ser desprovida de espaços finais.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Remoção de espaços à direita com Trim
User Function ExTrim()
    Local cTexto := "TOTVS Protheus    "
    ConOut("[" + Trim(cTexto) + "]") // "[TOTVS Protheus]"
Return`
  },
  {
    nome: "LTrim",
    categoria: "Strings",
    sintaxe: "LTrim( <cString> )",
    retorno: "Caractere (String sem espaços à esquerda)",
    descricaoCurta: "Remove todos os espaços em branco presentes no início (lado esquerdo) de uma string.",
    descricaoDetalhada: "Elimina espaços precedentes de um texto, muito utilizada após conversões de números via Str() para remover os espaços de alinhamento à esquerda.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "String da qual os espaços iniciais serão eliminados.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Remoção de espaços à esquerda com LTrim
User Function ExLTrim()
    Local cNumero := Str(150, 10) // "       150"
    ConOut("[" + LTrim(cNumero) + "]") // "[150]"
Return`
  },
  {
    nome: "RTrim",
    categoria: "Strings",
    sintaxe: "RTrim( <cString> )",
    retorno: "Caractere (String sem espaços à direita)",
    descricaoCurta: "Remove todos os espaços em branco presentes à direita de uma cadeia de caracteres.",
    descricaoDetalhada: "Equivalente direto da função Trim(). Muito utilizada para concatenar campos de tabelas do Protheus (que possuem tamanho fixo preenchido com espaços) sem criar espaçamentos indesejados.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Cadeia de caracteres a ser truncada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Concatenação limpa de campos com RTrim
User Function ExRTrim()
    Local cNome := RTrim(SA1->A1_NOME)
    Local cMun  := RTrim(SA1->A1_MUN)
    ConOut(cNome + " - " + cMun)
Return`
  },
  {
    nome: "IsAlpha",
    categoria: "Strings",
    sintaxe: "IsAlpha( <cString> )",
    retorno: "Lógico (.T. se o primeiro caractere for letra, .F. caso contrário)",
    descricaoCurta: "Verifica se o primeiro caractere de uma string é uma letra do alfabeto (A-Z ou a-z).",
    descricaoDetalhada: "Avalia se o caractere inicial da string informada pertence ao alfabeto. Retorna .F. para números, espaços, pontuações ou símbolos especiais.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "String a ser avaliada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Verificação se identificador inicia por letra
User Function ExIsAlpha()
    ConOut("Começa com letra: " + cValToChar(IsAlpha("Cliente123"))) // .T.
    ConOut("Começa com letra: " + cValToChar(IsAlpha("123Cliente"))) // .F.
Return`
  },
  {
    nome: "IsUpper",
    categoria: "Strings",
    sintaxe: "IsUpper( <cString> )",
    retorno: "Lógico (.T. se o primeiro caractere for letra maiúscula, .F. caso contrário)",
    descricaoCurta: "Verifica se o primeiro caractere de uma string é uma letra maiúscula.",
    descricaoDetalhada: "Retorna .T. se o primeiro caractere for uma letra alfabética maiúscula ('A' a 'Z'). Retorna .F. se for minúscula, número ou símbolo.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "String a inspecionar.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Checagem de letra maiúscula com IsUpper
User Function ExIsUpper()
    ConOut("Maiúscula: " + cValToChar(IsUpper("PROTHEUS"))) // .T.
    ConOut("Maiúscula: " + cValToChar(IsUpper("protheus"))) // .F.
Return`
  },
  {
    nome: "IsLower",
    categoria: "Strings",
    sintaxe: "IsLower( <cString> )",
    retorno: "Lógico (.T. se o primeiro caractere for letra minúscula, .F. caso contrário)",
    descricaoCurta: "Verifica se o primeiro caractere de uma string é uma letra minúscula.",
    descricaoDetalhada: "Retorna .T. se o primeiro caractere for uma letra alfabética minúscula ('a' a 'z'). Retorna .F. se for maiúscula, número ou símbolo.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "String a inspecionar.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Checagem de letra minúscula com IsLower
User Function ExIsLower()
    ConOut("Minúscula: " + cValToChar(IsLower("teste"))) // .T.
    ConOut("Minúscula: " + cValToChar(IsLower("Teste"))) // .F.
Return`
  },
  {
    nome: "Capital",
    categoria: "Strings",
    sintaxe: "Capital( <cString> )",
    retorno: "Caractere (String com iniciais das palavras em maiúsculas)",
    descricaoCurta: "Converte a primeira letra de cada palavra para maiúscula e as demais para minúsculas.",
    descricaoDetalhada: "Padroniza a capitalização de nomes próprios, títulos ou endereços no Protheus, convertendo o texto para o padrão 'Title Case' (ex: converte 'JOAO DA SILVA' em 'Joao Da Silva').",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Texto a ser capitalizado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Formatação de nomes em Title Case com Capital
User Function ExCapital()
    Local cNome := "CARLOS EDUARDO DE SOUZA"
    ConOut("Nome formatado: " + Capital(cNome))
    // "Carlos Eduardo De Souza"
Return`
  },
  {
    nome: "Encode64",
    categoria: "Strings",
    sintaxe: "Encode64( <cString> )",
    retorno: "Caractere (String codificada em Base64)",
    descricaoCurta: "Codifica uma cadeia de caracteres ou dados binários no padrão Base64.",
    descricaoDetalhada: "Função essencial de criptografia e formatação para integrações web, APIs REST, SOAP e envio de anexos por e-mail no Protheus. Converte qualquer string ou payload binário em sua representação textual segura Base64.",
    parametros: [
      { nome: "cString", tipo: "Caractere", descricao: "Conteúdo a ser codificado para Base64.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Codificação de credenciais para autenticação Basic
User Function ExEncode64()
    Local cCredenciais := "usuario:senha123"
    Local cBase64      := Encode64(cCredenciais)

    ConOut("Header Authorization: Basic " + cBase64)
Return`
  }
);

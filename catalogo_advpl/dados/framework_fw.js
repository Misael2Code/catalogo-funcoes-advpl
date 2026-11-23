/**
 * Catalogo de Funcoes ADVPL - Modulo Framework Protheus
 * Funcoes do framework TOTVS para gestao de filiais e regras corporativas
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "FWxFilial",
    categoria: "Framework Protheus",
    sintaxe: "FWxFilial( <cAlias> )",
    retorno: "Caractere (String)",
    descricaoCurta: "Retorna o codigo da filial correspondente a tabela informada, considerando compartilhamento ou exclusividade.",
    descricaoDetalhada: "Funcao oficial do Framework Protheus (evolucao da tradicional xFilial). Consulta a configuracao de modo de acesso da tabela no dicionario SX2 (compartilhada ou exclusiva). Se a tabela for compartilhada para a empresa, retorna string vazia (''). Se for exclusiva, retorna o codigo da filial ativa no contexto (cFilAnt). Utilizada em todas as chaves de busca por indice no Protheus.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela cadastrada no SX2 (ex: 'SA1', 'SB1', 'SC5').", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Busca por chave primaria respeitando o modo de compartilhamento da tabela
User Function ExFWxFilial()
    Local cFilialSA1 := FWxFilial("SA1")
    Local cCodCli    := "000100"
    Local cLojaCli   := "01"

    DbSelectArea("SA1")
    DbSetOrder(1) // A1_FILIAL + A1_COD + A1_LOJA

    // Busca concatenando a filial retornada pela funcao oficial do framework
    If DbSeek(cFilialSA1 + cCodCli + cLojaCli)
        ConOut("Cliente localizado na filial: " + cFilialSA1)
        ConOut("Razao Social: " + SA1->A1_NOME)
    Else
        ConOut("Cliente nao encontrado para esta filial!")
    EndIf
Return`
  }
);

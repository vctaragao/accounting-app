export interface DRE {
  year?: number;
  netRevenue?: number;
  costs?: number;
  grossProfit?: number;
  operatingExpenses?: number;
  EBITDA?: number;
  amortizationDepreciation?: number;
  EBIT?: number;
  nonOperatingIncome?: number;
  financialIncome?: number;
  taxes?: number;
  netIncome?: number;
  controllingInterestIncome?: number;
  nonControllingInterestIncome?: number;
  CAPEX?: number;
  totalDebt?: number;
  netDebt?: number;
  ROE?: number;
  ROIC?: number;
  grossMargin?: number;
  EBITDAMargin?: number;
  netMargin?: number;
  netDebtEBITDA?: number;
}

enum DREFields {
  ReceitaLiquida = 'Receita Líquida',
  Custos = 'Custos',
  LucroBruto = 'Lucro Bruto',
  DespesasReceitasOperacionais = 'Despesas/Receitas Operacionais',
  EBITDA = 'EBITDA',
  AmortizacaoDepreciacao = 'Amortização/Depreciação',
  EBIT = 'EBIT',
  ResultadoNaoOperacional = 'Resultado não operacional',
  ResultadoFinanceiro = 'Resultado Financeiro',
  Impostos = 'Impostos',
  LucroLiquido = 'Lucro Líquido',
  LucroAtribuidoControladora = 'Lucro atribuído a Controladora',
  LucroAtribuidoNaoControladores = 'Lucro atribuído a Não Controladores',
  CAPEX = 'CAPEX',
  DividaBruta = 'Dívida Bruta',
  DividaLiquida = 'Dívida Líquida',
  ROE = 'ROE',
  ROIC = 'ROIC',
  MargemBruta = 'Margem Bruta',
  MargemEBITDA = 'Margem Ebitda',
  MargemLiquida = 'Margem Líquida',
  DividaLiquidaEBITDA = 'Dívida Líquida/Ebitda',
}

const dreFieldsToBalance = {
  [DREFields.ReceitaLiquida]: 'netRevenue',
  [DREFields.Custos]: 'costs',
  [DREFields.LucroBruto]: 'grossProfit',
  [DREFields.DespesasReceitasOperacionais]: 'operatingExpenses',
  [DREFields.EBITDA]: 'EBITDA',
  [DREFields.AmortizacaoDepreciacao]: 'amortizationDepreciation',
  [DREFields.EBIT]: 'EBIT',
  [DREFields.ResultadoNaoOperacional]: 'nonOperatingIncome',
  [DREFields.ResultadoFinanceiro]: 'financialIncome',
  [DREFields.Impostos]: 'taxes',
  [DREFields.LucroLiquido]: 'netIncome',
  [DREFields.LucroAtribuidoControladora]: 'controllingInterestIncome',
  [DREFields.LucroAtribuidoNaoControladores]: 'nonControllingInterestIncome',
  [DREFields.CAPEX]: 'CAPEX',
  [DREFields.DividaBruta]: 'totalDebt',
  [DREFields.DividaLiquida]: 'netDebt',
  [DREFields.ROE]: 'ROE',
  [DREFields.ROIC]: 'ROIC',
  [DREFields.MargemBruta]: 'grossMargin',
  [DREFields.MargemEBITDA]: 'EBITDAMargin',
  [DREFields.MargemLiquida]: 'netMargin',
  [DREFields.DividaLiquidaEBITDA]: 'netDebtEBITDA',
};

export class DRECsvProcessor {
  processCsvFile(file: File): DRE[] {
    const reader = new FileReader();
    let dres: DRE[] = [];

    reader.onload = (event: any) => {
      const csvData = event.target.result;

      const lines = csvData.split('\n');
      const headers = lines[0].split(','); // ['BP', '2021', '2022']

      for (let i = 1; i < headers.length; i++) {
        const dre: DRE = { year: parseInt(headers[i]) };
        dres.push(dre);
      }

      for (let i = 0; i < dres.length; i++) {
        let dre = dres[i];
        type ObjectKey = keyof typeof dre;

        for (let j = 1; j < lines.length; j++) {
          const line = lines[j].match(/("[^"]+"|[^,]+)/g);
          const field = line[0].trim() as DREFields;
          const dreField = dreFieldsToBalance[field] as ObjectKey;
          const value = line[i + 1]
            ? parseFloat(
                line[i + 1].replace(/"/g, '').replace('.', '').replace(',', '.')
              )
            : undefined;

          dres[i][dreField] = value;
        }
      }
      localStorage.setItem('dreData', JSON.stringify(dres));
    };

    reader.onerror = (event: any) => {
      console.error(
        'Error occurred while reading the file:',
        event.target.error
      );
    };

    reader.readAsText(file);
    return dres;
  }
}

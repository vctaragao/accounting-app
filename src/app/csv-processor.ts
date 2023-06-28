interface Balance {
    year?: number;
    totalAssets?: number;
    currentAssets?: number;
    financialInvestments?: number;
    cashAndEquivalents?: number;
    accountsReceivable?: number;
    inventory?: number;
    nonCurrentAssets?: number;
    longTermRealizableAssets?: number;
    investments?: number;
    propertyPlantEquipment?: number;
    intangibleAssets?: number;
    totalLiabilities?: number;
    currentLiabilities?: number;
    nonCurrentLiabilities?: number;
    consolidatedShareholdersEquity?: number;
    contributedCapital?: number;
    capitalReserves?: number;
    retainedEarnings?: number;
    nonControllingInterest?: number;
}

enum BPFields {
    AtivoTotal = 'Ativo total',
    AtivoCirculante = 'Ativo Circulante',
    AplicacoesFinanceiras = 'Aplicações Financeiras',
    CaixaEquivalentesCaixa = 'Caixa e Equivalentes de Caixa',
    ContasReceber = 'Contas a Receber',
    Estoque = 'Estoque',
    AtivoNaoCirculante = 'Ativo Não Circulante',
    AtivoRealizavelLongoPrazo = 'Ativo Realizável a Longo Prazo',
    Investimentos = 'Investimentos',
    Imobilizado = 'Imobilizado',
    Intangivel = 'Intangível',
    PassivoTotal = 'Passivo Total',
    PassivoCirculante = 'Passivo Circulante',
    PassivoNaoCirculante = 'Passivo Não Circulante',
    PatrimonioLiquidoConsolidado = 'Patrimônio Líquido Consolidado',
    CapitalSocialRealizado = 'Capital Social Realizado',
    ReservaCapital = 'Reserva Capital',
    ReservaLucros = 'Reserva Lucros',
    ParticipacaoNaoControladores = 'Participação dos Não Controladores',
}

const bpFieldsToBalance = {
    [BPFields.AtivoTotal]: 'totalAssets',
    [BPFields.AtivoCirculante]: 'currentAssets',
    [BPFields.AplicacoesFinanceiras]: 'financialInvestments',
    [BPFields.CaixaEquivalentesCaixa]: 'cashAndEquivalents',
    [BPFields.ContasReceber]: 'accountsReceivable',
    [BPFields.Estoque]: 'inventory',
    [BPFields.AtivoNaoCirculante]: 'nonCurrentAssets',
    [BPFields.AtivoRealizavelLongoPrazo]: 'longTermRealizableAssets',
    [BPFields.Investimentos]: 'investments',
    [BPFields.Imobilizado]: 'propertyPlantEquipment',
    [BPFields.Intangivel]: 'intangibleAssets',
    [BPFields.PassivoTotal]: 'totalLiabilities',
    [BPFields.PassivoCirculante]: 'currentLiabilities',
    [BPFields.PassivoNaoCirculante]: 'nonCurrentLiabilities',
    [BPFields.PatrimonioLiquidoConsolidado]: 'consolidatedShareholdersEquity',
    [BPFields.CapitalSocialRealizado]: 'contributedCapital',
    [BPFields.ReservaCapital]: 'capitalReserves',
    [BPFields.ReservaLucros]: 'retainedEarnings',
    [BPFields.ParticipacaoNaoControladores]: 'nonControllingInterest',
};

export class CsvProcessor {
    processCsvFile(file: File): void {
        const reader = new FileReader();

        reader.onload = (event: any) => {
            const csvData = event.target.result;

            let balances: Balance[] = []
            const lines = csvData.split('\n');
            const headers = lines[0].split(',')

            if (headers[0] === 'BP') {
                for (let i = 1; i < headers.length; i++) {
                    const bp: Balance = { year: parseInt(headers[i]) };
                    balances.push(bp)
                }
            }

            for (let i = 0; i < balances.length; i++) {
                let bp = balances[i]
                type ObjectKey = keyof typeof bp;

                for (let j = 1; j < lines.length; j++) {
                    const line = lines[j].match(/("[^"]+"|[^,]+)/g);
                    const bpField = bpFieldsToBalance[(line[0].trim() as BPFields)] as ObjectKey
                    const value = line[i + 1] ? parseFloat(line[i + 1].replace(/"/g, '').replace('.', '').replace(',', '.')) : undefined;

                    balances[i][bpField] = value
                }
            }
            localStorage.setItem('bpData', JSON.stringify(balances));
        };

        reader.onerror = (event: any) => {
            console.error('Error occurred while reading the file:', event.target.error);
        };

        reader.readAsText(file);
    }
}

/*
Ativo Total - (R$)
Ativo Circulante - (R$)
Aplicações Financeiras - (R$)
Caixa e Equivalentes de Caixa - (R$)
Contas a Receber - (R$)
Estoque - (R$)
Ativo Não Circulante - (R$)
Ativo Realizável a Longo Prazo - (R$)
Investimentos - (R$)
Imobilizado - (R$)
Intangível - (R$)
Passivo Total - (R$)
Passivo Circulante - (R$)
Passivo Não Circulante - (R$)
Patrimônio Líquido Consolidado - (R$)
Capital Social Realizado - (R$)
Reserva Capital - (R$)
Reserva Lucros - (R$)
Participação dos Não Controladoresk
*/
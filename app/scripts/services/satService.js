(function () {
    'use strict';
    
    angular.module('app')
    .service('satService', [SatService]);
    
    function SatService($rootScope){
        var self = this;
        
        self.ConsultarSAT = ConsultarSAT;
        self.ConfigurarInterfaceDeRede = ConfigurarInterfaceDeRede;
        self.AtivarSAT = AtivarSAT;
        self.AssociarAssinatura = AssociarAssinatura;
        self.TesteFimAFim = TesteFimAFim;
        self.AtualizarSoftwareSAT = AtualizarSoftwareSAT;
        self.ConsultarStatusOperacional = ConsultarStatusOperacional;
        self.ExtrairLogs = ExtrairLogs;
        self.EnviarDadosVenda = EnviarDadosVenda;
        self.BloquearSAT = BloquearSAT;
        self.DesbloquearSAT = DesbloquearSAT;
        self.TrocarCodigoDeAtivacao = TrocarCodigoDeAtivacao;
        self.statusSucess = statusSucess;
        
        // Private functions
        function send(data){
           
        }

        function AtivarSAT(codAtivacao, cnpj, cUF){
            return send({
                fn: 'AtivarSAT',
                params: {
                    data: [codAtivacao,
                    cnpj,
                    cUF]
                }  
            })
        }

        function ConsultarSAT(){
            return send({
                fn: 'ConsultarSAT',
                params: {}  
            })
        }

        function ConfigurarInterfaceDeRede(codigoDeAtivacao, dadosConfiguracao){
            return send({
                fn: 'ConfigurarInterfaceDeRede',
                params: {
                    codigoDeAtivacao,
                    dadosConfiguracao
                }  
            })
        }

        function AssociarAssinatura(codigoDeAtivacao, CNPJvalue, assinaturaCNPJs){
            return send({
                fn: 'AssociarAssinatura',
                params: {
                    codigoDeAtivacao,
                    CNPJvalue,
                    assinaturaCNPJs
                }  
            })
        }

        function TesteFimAFim(codigoDeAtivacao){
            return send({
                fn: 'TesteFimAFim',
                params: {
                    codigoDeAtivacao
                }  
            })
        }

        function AtualizarSoftwareSAT(codigoDeAtivacao){
            return send({
                fn: 'AtualizarSoftwareSAT',
                params: {
                    codigoDeAtivacao 
                }  
            })
        }

        function ConsultarStatusOperacional(codigoDeAtivacao){
            return send({
                fn: 'ConsultarStatusOperacional',
                params: {
                    codigoDeAtivacao 
                }  
            })
        }

        function ExtrairLogs(codigoDeAtivacao){
            return send({
                fn: 'ExtrairLogs',
                params: {
                    codigoDeAtivacao 
                }  
            })
        }
        
        function EnviarDadosVenda(){}
        
        function BloquearSAT(codigoDeAtivacao){
            return send({
                fn: 'BloquearSAT',
                params: {
                    codigoDeAtivacao 
                }  
            })
        }
        
        function DesbloquearSAT(codigoDeAtivacao){
            return send({
                fn: 'DesbloquearSAT',
                params: {
                    codigoDeAtivacao 
                }  
            })
        }
        
        function TrocarCodigoDeAtivacao(codigo, opcao, novoCodigo){
            return send({
                fn: 'TrocarCodigoDeAtivacao',
                params: {
                    codigo,
                    opcao,
                    novoCodigo
                }  
            })
        }

        function statusSucess(EEEEE){
            return parseInt(EEEEE) % 1000 == 0;
        }
        
    }
})();
const tour = new Shepherd.Tour({
    defaultStepOptions: {
        cancelIcon: {
            enabled: true
        },
        classes: '',
        scrollTo: { behavior: 'smooth', block: 'center' }
    }
});

//ADMIN TOUR - NÃO NECESSÁRIO
function adminTour() {

    tour.addStep({
        title: 'Número de Empresas!',
        text: `Número de Empesas registadas na nossa plataforma.`,
        attachTo: {
            element: '.users',
            on: 'top'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'ola'
    });
}

//CAMARA TOUR
function camaraTour() {

}

//EMPRESA TOUR DASHBOARD
function empresaTourDashboard() {

    //STEP 0
    tour.addStep({
        title: 'Bem-Vindo à Environ!',
        text: `A Environ deseja as boas vindas! Para um melhor uso da nossa plataforma, preparamos um tutorial para si. Deseja continuar?`,
        buttons: [
            {
                action() {
                    cancelTutorial();
                    return this.hide();
                },
                classes: 'shepherd-button-secondary',
                text: 'Não, obrigado!'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Sim, vamos!'
            }
        ],
        id: 'step0_empresa'
    });

    //STEP1 - Dashboard
    tour.addStep({
        title: 'Tutorial: Dashboard',
        text: `<b>Passo 1</b>: Esta é a Dashboard! <br>
        Aqui pode ver de forma geral as estatísticas dos seus eventos, notícias, meteorologia.`,
        attachTo: {
            element: '.step1',
            on: 'right'
        },
        buttons: [
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step1_empresa'
    });

    //STEP1.1 - Indicadores
    tour.addStep({
        title: 'Tutorial: Dashboard',
        text: `<b>Passo 1.1</b>: Estes são indicadores relativos à nossa plataforma e à sua Gestão de Eventos.`,
        attachTo: {
            element: '#info',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step1_1_empresa'
    });

    //STEP1.2 - Map
    tour.addStep({
        title: 'Tutorial: Dashboard',
        text: `<b>Passo 1.2</b>: Este é o mapa que mostra as localizações dos seus eventos (aceites e por aceitar).`,
        attachTo: {
            element: '#map',
            on: 'top'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step1_2_empresa'
    });

    //STEP1.3 - Graphic
    tour.addStep({
        title: 'Tutorial: Dashboard',
        text: `<b>Passo 1.3</b>: Este é o gráfico que representa o número de eventos criados por mês.`,
        attachTo: {
            element: '#graphic',
            on: 'top'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step1_3_empresa'
    });

    //STEP1.4 - QR Code
    tour.addStep({
        title: 'Tutorial: Dashboard',
        text: `<b>Passo 1.4</b>: Com o seu telemóvel, é possível identificar a sua empresa.`,
        attachTo: {
            element: '#qrcode',
            on: 'left'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step1_4_empresa'
    });

    //STEP1.5 - Eventos Requisitados
    tour.addStep({
        title: 'Tutorial: Dashboard',
        text: `<b>Passo 1.5</b>: Este é um gráfico que representa a percentagem \(%\) de tipo dos eventos realizados por si.`,
        attachTo: {
            element: '#chart-pie-hugo',
            on: 'left'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    document.getElementById('listarEventos').click();
                    return this.next();
                },
                text: 'Tutorial: Eventos'
            }
        ],
        id: 'step1_5_empresa'
    });
}

//EMPRESA TOUR EVENTOS
function empresaTourEvents() {
    if (localStorage.getItem('nrEvents') === "0") {

        //STEP2
        tour.addStep({
            title: 'Tutorial: Eventos',
            text: `<b>Passo 2</b>: Esta é a sua Lista de Eventos!`,
            attachTo: {
                element: '.step2',
                on: 'bottom'
            },
            buttons: [
                {
                    action() {
                        return this.next();
                    },
                    text: 'Começar!'
                }
            ],
            id: 'step2_empresa'
        });

        //STEP 2.1
        tour.addStep({
            title: 'Tutorial: Listar Eventos!',
            text: `<b>Passo 2.1</b>: Ainda não tem nenhum evento! <br> Vá em <b>Eventos</b> > <b>Registar Eventos</b>.`,
            attachTo: {
                element: '#tbody',
                on: 'top'
            },
            buttons: [
                {
                    action() {
                        return this.back();
                    },
                    classes: 'shepherd-button-secondary',
                    text: 'Anterior'
                },
                {
                    action() {
                        document.getElementById('clickEventos').click();
                        return this.next();
                    },
                    text: 'Avançar'
                }
            ],
            id: 'step2.1_empresa'
        });

        //STEP 2.2
        tour.addStep({
            title: 'Tutorial: Listar Eventos!',
            text: `<b>Passo 2.2</b>: Clique aqui`,
            attachTo: {
                element: '.step3',
                on: 'right'
            },
            id: 'step2.2_empresa'
        });
    }
    else {
        //STEP 2.1
        tour.addStep({
            title: 'Tutorial: Listar Eventos',
            text: `<b>Passo 2.1</b>: Na Lista de Eventos, você consegue gerir todos os eventos que registou. 
            <br> As informações, o seu estado e os detalhes!`,
            attachTo: {
                element: '#tbody',
                on: 'top'
            },
            buttons: [
                {
                    action() {
                        return this.back();
                    },
                    classes: 'shepherd-button-secondary',
                    text: 'Anterior'
                },
                {
                    action() {
                        document.getElementById('clickEventos').click();
                        return this.next();
                    },
                    text: 'Avançar'
                }
            ],
            id: 'step2.1_alternative_empresa'
        });

        //STEP 2.2
        tour.addStep({
            title: 'Tutorial: Listar Eventos',
            text: `<b>Passo 2.2</b>: Este é o estado do seu evento. 
            <br>Caso o estado do evento estiver:
            <ul>
                <li><b>Suspenso</b>: Significa que está em fase de aceitação por parte do Administrador da Environ.</li>
                <li><b>Pendente</b>: Significa que está em fase de aceitação por parte da Camara Municipial onde o evento irá decorrer.</li>
                <li><b>Aceite</b>: Significa que o seu evento foi aceite e já pode fazer <b>Download</b> da autorização.</li>
            </ul>`,
            attachTo: {
                element: '#estado',
                on: 'top'
            },
            buttons: [
                {
                    action() {
                        return this.back();
                    },
                    classes: 'shepherd-button-secondary',
                    text: 'Anterior'
                },
                {
                    action() {
                        return this.next();
                    },
                    text: 'Avançar'
                }
            ],
            id: 'step2.2_alternative_empresa'
        });

        //STEP 4
        tour.addStep({
            title: 'Tutorial: Listar Eventos',
            text: `<b>Passo 4</b>: Nos detalhes, tem a opção de ver as informações detalhadas do evento e de fazer Scan do Código QR.
            <br> Na opção das informações detalhadas, se o Estado estiver:
            <ul>
                <li><b>Aceite</b>: É possível fazer o <b>Download</b> da autorização.</li>
            </ul>`,
            attachTo: {
                element: '#detalhes',
                on: 'top'
            },
            buttons: [
                {
                    action() {
                        return this.next();
                    },
                    text: 'Finalizar Tutorial!'
                }
            ],
            id: 'step4_alternative_empresa'
        });

    }
}

//EMPRESA TOUR REGISTO EVENTOS
function empresaTourRegisterEvents() {
    //STEP 3 - Intro
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3</b>: Aqui é onde se faz o registo dos eventos. <br>Vamos criar um evento!`,
        attachTo: {
            element: '.step4',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3_empresa'
    });

    //STEP 3.1 - Choose Location
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.1</b>: Escolha uma localização através do mapa ou escreva uma localização na Search Bar.`,
        attachTo: {
            element: '#map-evento',
            on: 'top'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3.1_empresa'
    });

    //STEP 3.2 - Choose a Name
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.2</b>: Escolha um nome para o seu evento!`,
        attachTo: {
            element: '#name',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3.2_empresa'
    });

    //STEP 3.3 - Edit/Add the Street
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.3</b>: Se quiser, edite a rua do seu evento!`,
        attachTo: {
            element: '#rua',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3.3_empresa'
    });

    //STEP 3.4 - Init Date
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.4</b>: Sugira uma data de ínicio para o seu evento!`,
        attachTo: {
            element: '#ini',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3.4_empresa'
    });

    //STEP 3.5 - End Date
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.5</b>: Sugira uma data de fim para o seu evento!`,
        attachTo: {
            element: '#fim',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3.5_empresa'
    });

    //STEP 3.6 - Duration
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.6</b>: Coloque aqui o número total de dias o seu evento vai durar!`,
        attachTo: {
            element: '#duration',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3.6_empresa'
    });

    //STEP 3.7 - NrParticipantes
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.7</b>: Coloque aqui o número total de participantes que o seu evento vai abranger!`,
        attachTo: {
            element: '#nrPart',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3.7_empresa'
    });

    //STEP 3.8 - Package Choose
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.8</b>: A camara disponibiliza vários pacotes. Escolha um que corresponda as características do seu evento. Este procedimento permite, assim, detetar todos os recursos necessários para uma realização eficaz!`,
        attachTo: {
            element: '#btnPackage',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3.8_empresa'
    });

    //STEP 3.9 - Description
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.9</b>: Faça aqui uma breve descrição do que consiste o evento.`,
        attachTo: {
            element: '#resumo',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Anterior'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Avançar'
            }
        ],
        id: 'step3.9_empresa'
    });

    //STEP 3.10 - Submeter
    tour.addStep({
        title: 'Tutorial: Registar Evento',
        text: `<b>Passo 3.10</b>: Clique em <b>Submeter</b> para concluir o registo do evento.`,
        attachTo: {
            element: '#btnSubmeter',
            on: 'right'
        },
        buttons: [
            {
                action() {
                    cancelTutorial();
                    return this.next();
                },
                text: 'Fim do Tutorial!'
            }
        ],
        id: 'step3.10_empresa'
    });

}

function cancelTutorial() {
    fetch('https://environ-back.herokuapp.com/user/tutorial', {
        method: 'PUT',
        credentials: 'include'
    }).then((response) => {
        if (response.ok) {
            fetch('https://environ-back.herokuapp.com/user', {
                credentials: 'include'
            }).then(resp => {
                return resp.json();
            }).then(result => {
                var user = JSON.stringify(result.user);
                sessionStorage.removeItem('user');
                sessionStorage.setItem("user", user);
                window.location.reload();
            })
        }
    })
}



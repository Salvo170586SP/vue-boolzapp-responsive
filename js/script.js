console.log('vue ok', Vue);

/* 
Milestone 5 - opzionale
Cancella messaggio: cliccando sul messaggio appare un menu a tendina 
che permette di cancellare il messaggio selezionato (vedi immagine in allegato)
Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti 
NOTE:
Ricordate di includere la proprietà visible nella nostra logica di ricerca
*/

Vue.config.devtools = true;

dayjs.extend(dayjs_plugin_customParseFormat);


const app = new Vue({
    el: '#app',
    data: {
        searchContact: '',
        newText: '',
        now: dayjs().format('DD/MM/YYYY HH:mm:ss'),
        currentIndex: 0,

        user: {
            name: 'Salvatore Pitanza',
            avatar: '_io'
        },
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    text: 'Hai portato a spasso il cane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    text: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    text: 'Tutto fatto!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    text: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    text: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    text: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    text: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    text: 'Ah scusa!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    text: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    text: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
                ],
            },
        ],
    },

    methods: {

        //* SELEZIONO I CONTATTI
        selectContact(index) {
             this.currentIndex = index;
        },

        //CAMBIO CHAT SU SMARTPHONE
        selectContactSmartphone() {
            const users = document.getElementById('users');
            const chat = document.getElementById('chat-box');
           if(chat){
               users.classList.toggle('d-none');
               chat.classList.toggle('d-block');
           } 
        },

        //* BOTTONE HOME
        tornaHome() {
            const users = document.getElementById('users');
             const chat = document.getElementById('chat-box');
            if(chat){
                users.classList.remove('d-none');
                chat.classList.remove('d-block');
            } 
        },

        //*AGGIUNGO UN MESSAGGIO
        addMessage() {
            if (this.newText !== '') {
                const newObject = {
                    date: this.now,
                    text: this.newText,
                    status: 'sent',
                };
                this.contacts[this.currentIndex].messages.push(newObject);
                this.newText = "";
            }

            //*FUNZIONE PER INSERIRE MESSAGGIO AUTOMATICO
            setTimeout(() => {
                const newObject = {
                    date: this.now,
                    text: 'ok',
                    status: 'received',
                };
                this.contacts[this.currentIndex].messages.push(newObject);
            }, 2000);
        },

        /* LOGICA ALTERNATIVA
        filterWord() {
            const wordSplit = this.contacts[this.currentIndex].name.split('');
            //console.log(wordSplit);      
            const arrayWord = wordSplit.filter((character) => {
                if(this.searchContact.includes(character)){
                    this.contacts[this.currentIndex].visible = true;
                }else{
                    this.contacts[this.currentIndex].visible = false;
                }            
            });
            return arrayWord 
        },*/

        //*FUNZIONE DI RICERCA 
        isOk(contact) {
            if (this.searchContact === '') {//se la casella di input è vuota
                return true; //rimane vero
            } else {  //altrimenti il nome del contatto è incluso nella casella di input
                return contact.name.toLowerCase().includes(this.searchContact);
            }
        },

        //*FUNZIONE CANCELLA MESSAGGIO
        clearMessage(index){
            this.contacts[this.currentIndex].messages.splice(index, 1);
        }
       

    },
})
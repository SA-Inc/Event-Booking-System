const app = new Vue({
    el: '#app',
    data: {
        postEventFlag: false,
        viewEventFlag: false,
        editEventFlag: false,

        newEvent: {
            title: '',
            description: '',
            location: '',
            start_date: new Date(),
            end_date: new Date(),
            online: false,
            offline: false,
        },

        selectedEvent: {
            id: 0,
            title: '',
            description: '',
            location: '',
            start_date: new Date(),
            end_date: new Date(),
            online: false,
            offline: false,
        },

        events: [],
        calendar_data: []
    },

    methods: {
        changeLanguage: function(language) {
            switch (language) {
                case 'en':
                    ELEMENT.locale(ELEMENT.lang.en)
                    break;
                case 'ru':
                    ELEMENT.locale(ELEMENT.lang.ruRU)
                    break;
                case 'kz':
                    ELEMENT.locale(ELEMENT.lang.kz)
                    break;
                case 'de':
                    ELEMENT.locale(ELEMENT.lang.de)
                    break;
            }
        },

        prepareCalendarData: function(data) {
            this.calendar_data = [];

            for (let row of data) {
              this.calendar_data.push(
                {
                  dot: true,
                  dates: row.start_date,
                  popover: {
                    label: `${row.title} ${row.location}: ${row.start_date} - ${row.end_date}`,
                    visibility: 'click'
                  },
                  customData: {
                  },
                }
              );
            }
      
            console.log(this.calendar_data)
          },

        getAllEvents: function() {
            const url = '/api/event';

            axios.get(url).then(response => {
                this.events = response.data;

                console.log(this.events)

                this.prepareCalendarData(this.events);
            })
            .catch((error) => {
                console.log(error);
            });
        },

        postEvent: function() {
            if (this.newEvent.title != null && this.newEvent.description != null && this.newEvent.location != null && this.newEvent.start_date != null && this.newEvent.end_date != null && this.newEvent.online != null && this.newEvent.offline != null) {
                const url = '/api/event';
                
                axios.post(url, {id: this.newEvent.id, title: this.newEvent.title, description: this.newEvent.description, location: this.newEvent.location, start_date: this.newEvent.start_date, end_date: this.newEvent.end_date, online: this.newEvent.online, offline: this.newEvent.offline }).then(response => {
                    console.log(response);

                    this.getAllEvents();
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                console.log('fill all');
            }
        },

        getEventByID: function(id) {
            const url = `/api/event/${id}`;

            axios.get(url).then(response => {
                const eventInfo = response.data;

                this.selectedEvent.id = eventInfo.id;
                this.selectedEvent.title = eventInfo.title;
                this.selectedEvent.description = eventInfo.description;
                this.selectedEvent.location = eventInfo.location;
                this.selectedEvent.start_date = eventInfo.start_date;
                this.selectedEvent.end_date = eventInfo.end_date;
                this.selectedEvent.online = eventInfo.online;
                this.selectedEvent.offline = eventInfo.offline;
            }).catch((error) => {
                console.log(error);
            });
        },

        updateEvent: function(id) {
            const url = `/api/event/${id}`;

            axios.put(url, this.selectedEvent).then(response => {
                console.log(response);
                this.getAllEvents();
            }).catch((error) => {
                console.log(error);
            });
        },

        deleteEvent: function(id) {
            const url = `/api/event/${id}`;

            axios.delete(url).then(response => {
                this.getAllEvents();
            }).catch((error) => {
                console.log(error);
            });
        },

        handleClose(done) {
            this.$confirm('Are you sure to close this dialog?')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        
        dateFormatter: function(date) {
            // const date = row[column.property]; 
            if (date == undefined) {
                return "";
            }
            return moment(date).format("DD.MM.YYYY HH:mm:ss");
        }
    },

    mounted() {
        ELEMENT.locale(ELEMENT.lang.en)

        this.getAllEvents();
    }
});
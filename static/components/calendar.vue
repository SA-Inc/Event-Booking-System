const Calendar  = {
    data() {
        return {
            events: [],
            calendar_data: []
        }
    },
    methods: {
        prepareCalendarData: function(data) {
            this.calendar_data = [];

            for (let row of data) {
              this.calendar_data.push(
                {
                  dot: true,
                  dates: row.start_date,
                  popover: {
                    label: `${row.title}: ${this.timeFormatter(row.start_date)} - ${this.timeFormatter(row.end_date)}`,
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

        timeFormatter: function(date) {
            if (date == undefined) {
                return "";
            }
            return moment(date).format("HH:mm:ss");
        }
    },
    mounted() {
        this.getAllEvents();
    },
    
    template: `
        <div>
            <el-button type="success" v-on:click="getAllEvents()">Reload</el-button>
            <v-calendar is-expanded show-weeknumbers :attributes='calendar_data'></v-calendar>
        </div>
    `
}
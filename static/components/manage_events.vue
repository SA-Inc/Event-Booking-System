const ManageEvents  = {
    data() {
        return {
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
        }
    },
    methods: {
        getAllEvents: function() {
            const url = '/api/event';

            axios.get(url).then(response => {
                this.events = response.data;

                console.log(this.events)
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
            if (date == undefined) {
                return "";
            }
            return moment(date).format("DD.MM.YYYY HH:mm:ss");
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

            <el-table :data="events" style="width: 100%">
                <el-table-column label="ID">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Title">
                    <template slot-scope="scope">
                        <span>{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Start Date">
                    <template slot-scope="scope">
                        <span>{{ dateFormatter(scope.row.start_date) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="End Date">
                    <template slot-scope="scope">
                        <span>{{ dateFormatter(scope.row.end_date) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Online">
                    <template slot-scope="scope">
                        <span v-if="scope.row.online === true" class="green_text">Yes</span>
                        <span v-else class="red_text">No</span>
                    </template>
                </el-table-column>
                <el-table-column label="Offline">
                    <template slot-scope="scope">
                        <span v-if="scope.row.offline === true" class="green_text">Yes</span>
                        <span v-else class="red_text">No</span>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template slot-scope="scope">
                        <span><el-button plain type="primary" @click="getEventByID(scope.row.id); viewEventFlag = true"><i class="el-icon-document"></i></el-button></span>
                        <span><el-button plain type="warning" @click="getEventByID(scope.row.id); editEventFlag = true"><i class="el-icon-edit"></i></el-button></span>
                        <span><el-button plain type="danger" @click="deleteEvent(scope.row.id)"><i class="el-icon-delete"></i></el-button></span>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="View Event" :visible.sync="viewEventFlag" width="90%" :before-close="handleClose">
                <p>ID <span>{{ selectedEvent.id }}</span></p>
                <p>Title <span>{{ selectedEvent.title }}</span></p>
                <p>Location <span>{{ selectedEvent.location }}</span></p>
                <p>Starts <span>{{ dateFormatter(selectedEvent.start_date) }}</span></p>
                <p>Ends <span>{{ dateFormatter(selectedEvent.end_date) }}</span></p>

                <p>Online
                    <span v-if="selectedEvent.online === true" class="green_text">Yes</span>
                    <span v-else class="red_text">No</span>
                </p>

                <p>Offline
                    <span v-if="selectedEvent.offline === true" class="green_text">Yes</span>
                    <span v-else class="red_text">No</span>
                </p>

                <p>Description <span>{{ selectedEvent.description }}</span></p>

                <span slot="footer" class="dialog-footer">
                    <el-button type="danger" v-on:click="viewEventFlag = false">Close</el-button>
                </span>
            </el-dialog>



            <el-dialog title="Update Event" :visible.sync="editEventFlag" width="90%" :before-close="handleClose">
                <el-form>
                    <p>ID {{ selectedEvent.id }}</p>

                    <el-form-item>
                        <el-input placeholder="Title" v-model="selectedEvent.title"></el-input>
                    </el-form-item>
    
                    <el-form-item>
                        <el-input placeholder="Location" v-model="selectedEvent.location"></el-input>
                    </el-form-item>
    
                    <el-form-item>
                        <el-date-picker placeholder="Starts" type="datetime" v-model="selectedEvent.start_date"></el-date-picker>
                    </el-form-item>
    
                    <el-form-item>
                        <el-date-picker placeholder="Ends" type="datetime" v-model="selectedEvent.end_date"></el-date-picker>
                    </el-form-item>
    
                    <el-form-item>
                        <span>Online</span>
                        <el-switch v-model="newEvent.online" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <span>Offline</span>
                        <el-switch v-model="newEvent.offline" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </el-form-item>
    
                    <el-form-item>
                        <el-input placeholder="Description" type="textarea" :rows="5"  v-model="selectedEvent.description"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button type="danger" v-on:click="editEventFlag = false">Close</el-button>
                    <el-button type="success" v-on:click="editEventFlag = false; updateEvent(selectedEvent.id)">Update</el-button>
                </span>
            </el-dialog>
        </div>
    `
}
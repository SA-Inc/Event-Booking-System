const CreateEvent  = {
    data() {
        return {
            newEvent: {
                title: '',
                description: '',
                location: '',
                start_date: new Date(),
                end_date: new Date(),
                online: false,
                offline: false,
            },
        }
    },
    methods: {
        postEvent: function() {
            if (this.newEvent.title != '' && this.newEvent.description != '' && this.newEvent.location != '' && this.newEvent.start_date != null && this.newEvent.end_date != null && this.newEvent.online != null && this.newEvent.offline != null) {
                const url = '/api/event';
                
                axios.post(url, {id: this.newEvent.id, title: this.newEvent.title, description: this.newEvent.description, location: this.newEvent.location, start_date: this.newEvent.start_date, end_date: this.newEvent.end_date, online: this.newEvent.online, offline: this.newEvent.offline }).then(response => {
                    console.log(response);

                    this.$notify({
                        title: 'Success',
                        message: 'Event was created',
                        type: 'success'
                    });
                }).catch((error) => {
                    console.log(error);

                    this.$notify({
                        title: 'Error',
                        message: 'Some error has accured',
                        type: 'error'
                    });
                });
            } else {
                this.$notify({
                    title: 'Warning',
                    message: 'Not all fields was filled',
                    type: 'warning'
                });
            }
        },
    },

    template: `
        <div>
            <el-form>
                <el-form-item >
                    <el-input placeholder="Title" v-model="newEvent.title"></el-input>
                </el-form-item>
    
                <el-form-item>
                    <el-input placeholder="Location" v-model="newEvent.location"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-date-picker placeholder="Starts" type="datetime" v-model="newEvent.start_date"></el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-date-picker placeholder="Ends" type="datetime" v-model="newEvent.end_date"></el-date-picker>
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
                    <el-input placeholder="Description" type="textarea" :rows="5"  v-model="newEvent.description"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button type="primary" v-on:click="postEvent();">Create</el-button>
            </span>
        </div>
  `
}
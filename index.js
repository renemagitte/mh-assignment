var app = new Vue({
    el: '#mh-app',
    name: 'MHApp',
    data() {
        return {
            deliveryTimes: [],
            // Selected by user:
            inHome: false,
            deliveryTime: null,
        }
    },
    created(){
        this.fetchDeliveryTimes();
    },
    methods: {
        fetchDeliveryTimes() {
            fetch('api/delivery-times')
            .then(response => { return response.json() })
            .then(data => { this.handleDeliveryTimesData(data) })
            .catch(err => { alert('Något gick fel.') }); 
        },
        handleDeliveryTimeSelect(id){
            this.deliveryTime = id;
        },
        handleDeliveryTimesData(data) {
            data.sort((a, b) => {
                return a.startTime > b.startTime ? 1 : b.startTime > a.startTime ? -1 : 0;
            }).map(obj => {
                obj.time = obj.startTime + ' - ' + obj.stopTime;
            });
            this.deliveryTimes = data;
        }
    }
});
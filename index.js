
var app = new Vue({
    el: '#mh-app',
    name: 'MHApp',
    data() {
        return {
            deliveryTimes: [],
            selectedInputId: null,
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
        handleDeliveryTimeSelect(e){
            this.selectedInputId = e.srcElement.id;
            this.deliveryTime = e.srcElement.dataset.time; 
        },
        handleDeliveryTimesData(data) {
            data.sort((a, b) => {
                return a.startTime > b.startTime ? 1 : b.startTime > a.startTime ? -1 : 0;
            }).map(obj => {
                obj.time = obj.startTime.substring(0, 5) + ' - ' + obj.stopTime.substring(0, 5);
            });
            this.deliveryTimes = data;
        }
    }
});

// module.exports = app;
<template>

<!--  <transition name='modal'>-->
<!--    <div class='modal-mask'>-->
<!--      <div class='modal-wrapper'>-->
<!--        <div class='modal-container'>-->

<!--         <div class='modal-body'>-->
<!--            <slot name='body'>-->
<!--                <img src="../assets/1.jpg">-->
<!--            </slot>-->
<!--          </div>-->

<!--          <div class='modal-footer'>-->
<!--            <slot name='footer'>-->
<!--              default footer-->
<!--              <button class='modal-default-button' @click='$emit("close")'>-->
<!--                ok-->
<!--              </button>-->
<!--            </slot>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </transition>-->

        <el-container>
            <el-col :span="6" >
                <ol>
                <li v-for=" url  in url_pic">
                    <img :src="url">
<!--                    {{url}}-->
                </li>
                </ol>

            </el-col>
            <el-col :span="6">
                <img src="../assets/1.jpg" min-width="200" height="200" @click="showBig()">
                <img src="../assets/3.jpg" min-width="200" height="200">
            </el-col>
            <el-col :span="6">
                <img src="../assets/2.jpg" min-width="200" height="200">
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <img src="../assets/3.jpg" min-width="200" height="200">
            </div>
            </el-col>
        </el-container>

</template>

<script>
    import axios from '../axios'
    export default {
        components:{

        },
        name: "TimeLine",
        data(){
            return{
                photo_all:[],
                photo_id_all:[],
                showModal: false,
                pic:'',
                url_pic:[],
            }
        },
        created() {
            let _this = this;
            axios({
                method:'get',
                url: 'http://photo.upc.pub/photo/get_all/',
                headers:{
                    "authorization" : "Bearer " + window.localStorage.getItem('Authorization'),
                }
            }).then(function (res) {
                _this.photo_all = res.data.content;
                _this.photo_id_all = _this.photo_all.map( a => a.id);
                for(let i = 0; i< _this.photo_id_all.length; i++){
                    _this.url_pic[i] = _this.get_thumbnail_photo(_this.photo_id_all[i]);
                }
            }).catch(function (error){
                console.log(error);
            });
        },
        methods:{

            get_photo(id){
                let _id = id;
                axios({
                    method:'get',
                    url: 'http://photo.upc.pub/photo/get__photo/' + _id,
                    headers:{
                        "authorization" : "Bearer " + window.localStorage.getItem('Authorization'),
                    }
                }).then(function (res) {
                    console.log(res);
                }).catch(function (error){
                    console.log(error);
                });
            },
            get_thumbnail_photo(id){
                let _this = this;
                let _id = id;
                let pic = '';
                axios({
                    method:'get',
                    url: 'http://photo.upc.pub/photo/get_thumbnail_photo/' + _id,
                    headers:{
                        "authorization" : "Bearer " + window.localStorage.getItem('Authorization'),
                    },
                    responseType: 'blob',
                }).then(function (res) {
                    let data = res.data;
                    let reader = new FileReader();
                    reader.onload = function (data) {
                        pic = data.target.result;
                    };
                    reader.readAsDataURL(data);

                    return pic;
                }).catch(function (error){
                    console.log(error);
                });
            }
        },
        computed:{

        }

    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: gray;
        display: table;
        transition: opacity 1s;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: lightblue;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all 1s ease;
    }

    .modal-header h3 {
        margin-top:0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
    }

    .modal-footer {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }

    .modal-enter {
        opacity: 0;
    }


    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.3);
        transform: scale(1.3);
    }
</style>

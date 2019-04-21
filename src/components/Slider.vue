<template>
    <div id="slider">
        <div class="Login-box">
            <LoginBox></LoginBox>
        </div>
        <div class="window" @mouseover="stop" @mouseleave="play">
            <!--图片列表，无限回滚-->
            <ul class="container" :style="containerStyle">
                <li>
                    <img :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 1].img" alt="">
                </li>
                <li  v-for="(item, index) in sliders" :key="index">
                    <img :style="{width:imgWidth+'px'}" :src="item.img" alt="">
                </li>
                <li>
                    <img :style="{width:imgWidth+'px'}" :src="sliders[0].img" alt="">
                </li>
            </ul>
            <!--图片下面的切换点-->
            <ul class="dots">
                <li v-for="(dot, i) in sliders" :key="i"
                    :class="{dotted: i === (currentIndex-1)}"
                    @click = jump(i+1)
                >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import LoginBox from "./LoginBox";
    export default {
        name: 'Slider',
        components: {
            'LoginBox':LoginBox
        },
        props: {
            //切换图片速度
            initialSpeed: {
                type: Number,
                default: 30
            },
            //图片停顿时间长度
            initialInterval: {
                type: Number,
                default: 5
            }
        },
        data () {
            return {
                //将图片加入图片列表
                sliders:[
                    {
                        img : require('../assets/img/bg7.jpg')
                    },
                    {
                        img:require('../assets/img/bg5.jpg')
                    },
                    {
                        img:require('../assets/img/bg6.jpg')
                    },
                    {
                        img:require('../assets/familyphoto.jpg')
                    },
                    {
                        img:require('../assets/img/bg8.jpg')
                    },
                ],
                imgWidth:1550,
                currentIndex:1,
                distance:-1550,
                transitionEnd: true,
                speed: this.initialSpeed
            }
        },
        computed:{
            containerStyle() {
                return {
                    transform:`translate3d(${this.distance}px, 0, 0)`
                }
            },
            interval() {
                return this.initialInterval * 1000
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init() {
                this.play();
                window.onblur = function() { this.stop() }.bind(this);
                window.onfocus = function() { this.play() }.bind(this);
            },
            move(offset, direction, speed) {
                //console.log(speed);
                if (!this.transitionEnd) return;
                this.transitionEnd = false;
                direction === -1 ? this.currentIndex += offset/1550 : this.currentIndex -= offset/1550
                if (this.currentIndex > 5) this.currentIndex = 1;
                if (this.currentIndex < 1) this.currentIndex = 5;

                const destination = this.distance + offset * direction
                this.animate(destination, direction, speed)
            },
            animate(des, direc, speed) {
                if (this.temp) {
                    window.clearInterval(this.temp);
                    this.temp = null ;
                }
                this.temp = window.setInterval(() => {
                    if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
                        this.distance += speed * direc
                    } else {
                        this.transitionEnd = true;
                        window.clearInterval(this.temp);
                        this.distance = des;
                        if (des < -7750) this.distance = -1550;
                        if (des > -1550) this.distance = -7750
                    }
                }, 20)
            },
            jump(index) {
                const direction = index - this.currentIndex >= 0 ? -1 : 1;
                const offset = Math.abs(index - this.currentIndex) * 1550;
                const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed ;
                this.move(offset, direction, jumpSpeed)
            },
            play() {
                if (this.timer) {
                    window.clearInterval(this.timer)
                    this.timer = null
                }
                this.timer = window.setInterval(() => {
                    this.move(1550, -1, this.speed)
                }, this.interval)
            },
            stop() {
                window.clearInterval(this.timer)
                this.timer = null
            }
        }
    }
</script>

<style>
    *{
        box-sizing: border-box;
        margin:0;
        padding:0;
    }
    ol,ul{
        list-style: none;
    }
    #slider{
        text-align: center;
    }
    .window{
        position:relative;
        width:1280px;
        height:619px;
        margin:0 auto;
        overflow:hidden;
    }
    .container{
        display:flex;
        position:absolute;
    }
    img{
        user-select: none;
    }
    .dots{
        position:absolute;
        bottom:10px;
        left:50%;
        transform:translateX(-50%);
    }
    .dots li{
        display:inline-block;
        width:15px;
        height:15px;
        margin:0 3px;
        border:1px solid white;
        border-radius:50%;
        background-color:#333;
        cursor:pointer;
    }
    .dots .dotted{
        background-color:orange;
    }
    .Login-box{
        top: 60%;
        right: 30%;
        margin-top: -230px;
        margin-right: -200px;
        position: absolute;
        z-index:999;
    }
</style>

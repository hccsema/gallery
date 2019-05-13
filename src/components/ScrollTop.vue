<template>
        <transition name="el-fade-in">
            <div class="page-up" v-show="btnFlag" @click="backTop">
                <i class="el-icon-caret-top"></i>
            </div>
        </transition>
</template>

<script>
    export default {
        name:"ScrollTop",
        data() {
            return {
                return: {
                    btnFlag: false,
                }
            }
        },
        mounted(){
            window.addEventListener('scroll', this.scrollToTop);
        },
        method:{
            // 点击图片回到顶部方法，加计时器是为了过渡顺滑
            backTop () {
                let that = this;
                let timer = setInterval(() => {
                    let ispeed = Math.floor(-that.scrollTop / 5);
                    document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
                    if (that.scrollTop === 0) {
                        clearInterval(timer);
                    }
                }, 16)
            },

            // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
            scrollToTop () {
                let that = this;
                that.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                that.btnFlag = that.scrollTop > 60;
            },
        },
        destroyed(){
            window.removeEventListener('scroll', this.scrollToTop);
        }
    }
</script>


<style scoped lang="scss">
    .page-up{
        background-color: #409eff;
        position: fixed;
        right: 50px;
        bottom: 30px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
        transition: .3s;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
        opacity: .5;
        z-index: 100;
        .el-icon-caret-top{
            color: #fff;
            display: block;
            line-height: 40px;
            text-align: center;
            font-size: 18px;
        }
        p{
            display: none;
            text-align: center;
            color: #fff;
        }
        &:hover{
            opacity: 1;
        }
    }
</style>

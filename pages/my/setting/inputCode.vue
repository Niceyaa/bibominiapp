<template>
	<view class="input-code">
		<back-header v-if="!isPwd" title="设置安全密码"></back-header>
		<back-header v-else title="修改安全密码"></back-header>
		<view class="input-code-main">
			<view v-if="!isPwd" class="input-code-title">请设置6位数字安全密码，用于账户资金变动验证</view>
			<view v-else class="input-code-title">请输入当前密码，以验证身份</view>
			<view class="code-wrapper">
				<input v-model="v1" disabled="true" class="code-item" type="number" password="true" maxlength="1" />
				<input v-model="v2" disabled="true" class="code-item" type="number" password="true" maxlength="1" />
				<input v-model="v3" disabled="true" class="code-item" type="number" password="true" maxlength="1" />
				<input v-model="v4" disabled="true" class="code-item" type="number" password="true" maxlength="1" />
				<input v-model="v5" disabled="true" class="code-item" type="number" password="true" maxlength="1" />
				<input v-model="v6" disabled="true" class="code-item" type="number" password="true" maxlength="1" />
			</view>
			<!-- 定义一个隐藏的输入框 -->
			<input @input="inputHandle" class="real-input" type="number" maxlength="6" />
			<!-- 定义忘记密码 -->
			<view @click="forgetPwd" v-if="isPwd" class="forget-pwd">忘记密码?</view>
			<button v-if="!isPwd" :class="{'next-step':true,'redBgc':inputFlag}" @click="next">确定</button>
			<button v-else :class="{'next-step':true,'redBgc':inputFlag}" @click="next">下一步</button>
		</view>
	</view>
</template>

<script>
import backHeader from '../../../components/childheader.vue';
import { updatePayPwd } from "../../../Api/myApi/updatePayPwd.js"
export default {
	data() {
		return {
			pwdCode: '',
			inputFlag: false,
			v1: '',
			v2: '',
			v3: '',
			v4: '',
			v5: '',
			v6: '',
			isPwd: false,
			VCode: ""
		};
	},
	watch: {
		pwdCode(v) {
			let len = v.length;
			if(len > 0){
				this.inputFlag = true;
			}else{
				this.inputFlag = false;
			}
			switch (len) {
				case 0:
					this.v1 = '';
					this.v2 = '';
					this.v3 = '';
					this.v4 = '';
					this.v5 = '';
					this.v6 = '';
					break;
				case 1:
					this.v1 = v.substr(0, 1);
					this.v2 = '';
					this.v3 = '';
					this.v4 = '';
					this.v5 = '';
					this.v6 = '';
					break;
				case 2:
					this.v1 = v.substr(0, 1);
					this.v2 = v.substr(1, 1);
					this.v3 = '';
					this.v4 = '';
					this.v5 = '';
					this.v6 = '';
					break;
				case 3:
					this.v1 = v.substr(0, 1);
					this.v2 = v.substr(1, 1);
					this.v3 = v.substr(2, 1);
					this.v4 = '';
					this.v5 = '';
					this.v6 = '';
					break;
				case 4:
					this.v1 = v.substr(0, 1);
					this.v2 = v.substr(1, 1);
					this.v3 = v.substr(2, 1);
					this.v4 = v.substr(3, 1);
					this.v5 = '';
					this.v6 = '';
					break;
				case 5:
					this.v1 = v.substr(0, 1);
					this.v2 = v.substr(1, 1);
					this.v3 = v.substr(2, 1);
					this.v4 = v.substr(3, 1);
					this.v5 = v.substr(4, 1);
					this.v6 = '';
					break;
				case 6:
					this.v1 = v.substr(0, 1);
					this.v2 = v.substr(1, 1);
					this.v3 = v.substr(2, 1);
					this.v4 = v.substr(3, 1);
					this.v5 = v.substr(4, 1);
					this.v6 = v.substr(5, 1);
					break;
			}
		}
	},
	mounted() {
		this.isPwd = uni.getStorageSync("isPwd");
		
		
	},
	components: {
		backHeader
	},
	onLoad(opt) {
		// 接收传过来的验证码 c
		
		this.vCode = opt.c;
	},
	methods: {
		next() {
			if(this.pwdCode.length >= 6){
				if(this.isPwd === true){
					// 修改安全密码
					uni.navigateTo({
						url:`/pages/my/setting/newPwd?c=${this.vCode}&old=${this.pwdCode}`
					});
					return
				}else{
					// 设置安全密码
					updatePayPwd({
						code: this.vCode,
						balance_passwd: this.pwdCode
					}).then(res=>{
						if(res[1].data.err_msg === "密码设置成功！");
						uni.navigateTo({
							url:"/pages/my/setting/pwdSuccess"
						})
						console.log("设置密码",res)
					})
					/* uni.navigateTo({
						url:"/pages/my/setting/pwdSuccess"
					}) */
					return
				}
			}
			console.log(222)
			return;
		},
		inputHandle(e) {
			this.pwdCode = e.detail.value;
			console.log(this.pwdCode);
			//console.log(e.detail);
		},
		forgetPwd(){
			console.log("我想要找回密码");
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;
	.input-code {
		height: 100%;
		background: #f6f6f6;
		.input-code-main {
			padding-top: 140upx;
			font-size: 28upx;
			position: relative;
			.input-code-title {
				color: #222222;
				padding: 110upx 0 54upx 40upx;
			}
			.code-wrapper {
				display: flex;
				flex-wrap: nowrap;
				padding: 0 54upx;
				justify-content: space-around;
				.code-item {
					background: #fff;
					width: 90upx !important;
					height: 110upx !important;
					text-align: center;
					font-size: 50upx;
				}
			}
			.real-input {
				position: absolute;
				width: 120%;
				top: 0;
				left: -120%;
				margin: 336upx 0 0 150upx;
				line-height: 110upx;
				height: 110upx;
				border: none;
				outline: none;
			}
			.forget-pwd{
				position: absolute;
				top: 0;
				right: 54upx;
				margin-top: 504upx;
				color: #087EEB;
			}
			.next-step {
				margin: 198upx 55upx 0 55upx;
				line-height: 96upx;
				height: 96upx;
				text-align: center;
				font-size: 32upx;
				color: #ffffff;
				background: #fb8c97;
				border-radius: 10upx;
				&.redBgc{
					background: #FF4657;
				}
			}
		}
	}
}
</style>

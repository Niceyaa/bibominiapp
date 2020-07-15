<template>
	<view class="input-code">
		<back-header title="设置新的安全密码"></back-header>
		<view class="input-code-main">
			<view class="input-code-title">设置新的6位数字安全密码，用于账户资金变动验证</view>
			
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
			<button :class="{'next-step':true,'redBgc':inputFlag}" @click="setPwd">确定</button>
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
	onLoad(opt) {
		this.c = opt.c;
		this.old = opt.old;
	},
	components: {
		backHeader
	},
	methods: {
		setPwd() {
			updatePayPwd({
				balance_passwd: this.pwdCode,
				old_balance_passwd: this.old
			}).then(res=>{
				if(res[1].data.err_msg === "老密码填写错误；请确认！"){
					uni.showToast({
						title:res[1].data.err_msg,
						icon:"none",
						duration:1000
					})
					
					setTimeout(()=>{
						uni.navigateBack();
					},1000)
				}
				
				console.log(res)
				if(res[1].data.err_msg === "密码修改成功！"){
					uni.showToast({
						title:res[1].data.err_msg,
						icon:"none",
						duration:1000
					})
					uni.navigateTo({
						url: '/pages/my/setting/pwdSuccess'
					});
				}
				
			})
			
		},
		inputHandle(e) {
			this.pwdCode = e.detail.value;
			console.log(this.pwdCode);
			//console.log(e.detail);
		},
		
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

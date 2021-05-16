change getError get error state
change time get timeout state

***
### 决策:
1. 应用主要有5个状态:"Loading"|"Nothing"| "Error"|"Response"|"Timeout",且这个状态是全局的.
2. 每次searchword的改变,都会使条目组件刷新.
3. 每次点击tag都会对axios获得的数据进行filter处理.

### 优化:
1. 添加清除函数,清除副作用,可以防止引起内存泄露
2. 改为async,await函数处理axios,语法解构更清晰,优化代码速度
3. 限制请求时间,防止频繁过多的get数据
4. 移动端优化,添加控制函数隐藏鼠标样式
5. 动画优化
6. 打包成小的app,安装在系统上,配置快捷键,随时打开使用

### 遇到的问题
之前没有接触过单选的逻辑,不太清楚该怎么实现,原本是想使用input radio来实现,然后修改css样式. 以及尝试用现成组件库再修改样式. 然后发现好像不太行而且好麻烦,后来才发现这个逻辑并不是很难.😅

***

### 使用方法
我使用的脚手架是https://github.com/dance2die/cra-template-tailwindcss-typescript
simple yarn install && yarn start
直接yarn install 和yarn start 就可以了 

修改getError 和 time变量分别获得error 和timeout状态
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="java.text.*"%>


<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf8" />
    <meta http-equiv="Expires" content="0" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="Pragma" content="no-cache" />

    <title>百度无限搜索大赛</title>
    <link href="css/base.css" rel="stylesheet" type="text/css" />
    <link href="css/index.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/base/video-hack.js"></script>
</head>

<body>
<!--提醒比赛时间-->
<div id="time_reminder">
    <%
        Date nowDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date1 = sdf.parse("2017/5/11 00:00:00");
        Date date2 = sdf.parse("2017/5/20 00:00:00");
        Date date3 = sdf.parse("2017/5/25 19:00:00");
        Date date4 = sdf.parse("2017/5/25 21:00:00");
        Date date5 = sdf.parse("2017/6/09 00:00:00");
        //  long day = (date1.getTime()- nowDate.getTime())/(1000*24*60*60);;
        long day1 = date1.getTime() - nowDate.getTime();
        long day2 = date2.getTime() - nowDate.getTime();
        long day3 = date3.getTime() - nowDate.getTime();
        long day4 = date4.getTime() - nowDate.getTime();
        int month = nowDate.getMonth() + 1;

        if ((month >= 1 && month <= 5) && (day1 > 0)) {
    %>
    <span class="tip">距离初赛开始还有<label class="left-days"><%=day1 / (1000 * 24 * 60 * 60)%>
		</label>天<label class="left-days"><%=(day1%(1000*24*60*60))/(1000*60*60) %></label>小时
		</span>
    <%
    } else if (day2 >= 0) {
    %>
    <span class="tip">初赛正在进行，距结束还有<label class="left-days"><%=day2 / (1000 * 24 * 60 * 60)%>
		</label>天<label class="left-days"><%=(day2%(1000*24*60*60))/(1000*60*60) %></label>小时
		</span>
    <%
    } else if (day3 > 0) {
    %>
    <span class="tip">初赛已经结束，距复赛还有<label class="left-days"><%=day3 / (1000 * 24 * 60 * 60)%></label>天<label
            class="left-days"><%=(day3%(1000*24*60*60))/(1000*60*60) %></label>小时<label
            class="left-days"><%=(day3%(1000*60*60))/(1000*60) %></label>分
		</span>
    <%
    } else if (day4 > 0) {
    %>
    <span class="tip">复赛正在进行,距结束还有<label class="left-days"><%=day4 / (1000 * 24 * 60 * 60)%></label>天<label
            class="left-days"><%=(day4%(1000*24*60*60))/(1000*60*60) %></label>小时<label
            class="left-days"><%=(day4%(1000*60*60))/(1000*60) %></label>分
		</span>
    <%
    } else {
    %>
    <span class="tip">敬请期待<label class="left-days">2017/06/29</label>决赛！<label class="left-days">
            <%
					}
				%>

</div>
<!--对活动名，活动赞助方logo等进行打包-->
<div id="wrap">
    <div class="head clearfix">
        <div class="logo-area">
            <!--设置赞助方logo-->
            <img class="logo-img" src="images/baidu.png" />
        </div>
        <div class="logotxt">
            <!-- <p class="tc f14">联合国教科文组织 "全民信息计划” & “百度校园”</p> -->

            <label class="fb f16"><span style="font-size: 30px;">第十一届</span>＂百度无限＂全国高校信息搜索大赛——人工智能&nbsp;搜联天下</label>
        </div>
        <div class="clearit"></div>
    </div>
    <div class="center-container">
        <!--视频-->
        <div class="video">
            <embed
                    src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=b0397mexye0&auto=1"
                    quality="high" bgcolor="#000000" width="500px" height="505px"
                    align="middle" autostart=true LOOP=true allowFullScreen="false"
                    type="application/x-shockwave-flash">
            </embed>
        </div>

        <div class="main">
            <div class="main_top_com">
                <p class="title" style="margin-top: 10px;">●大赛背景</p>
                <ul class="maintable">
                    <li>
                        <div class="mt_m">
                            &nbsp;&nbsp;&nbsp;&nbsp;“人工智能”一词最初是在1956年，以麦卡塞、明斯基、罗切斯特和申农为<br />首的一批科学家聚会时，探讨用机器模拟智能的一系列有关问题时提出的。当前<br />人工智能已成为各国最为重视的新兴技术之一。近日，国家发改委正式批复，<br />为了解决我国人工智能基础支撑能力不足等问题，由百度牵头筹建深度学习技术<br />及应用国家工程实验室，这个实验室将着重发力于深度学习技术、计算机视<br />觉感知技术、计算机听觉技术、生物特征识别技术、新型人机交互技术、标准化<br />服务、深度学习知识产权七大方向，建设“国内领先、世界一流”的深度学习<br />技术及应用研究机构，从研究突破、产业合作、技术成果转让、人才培养等方面<br />提升我国人工智能领域整体竞争力。作为中国人工智能领域的领军力量，百<br />度近些年在技术上投入巨大，早在2013年就建立了深度学习研究院（IDL），<br />之后又筹建了大数据实验室（BDL）和硅谷人工智能实验室（SVAIL），<br />AR实验室（ARL）等，并发布了领先的深度学习平台（PaddlePaddle），<br />构建了全面的人工智能研发体系，在语音、图像及无人驾驶等众多技术和应<br />用领域都达到了全球领先水平。<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;基于以上背景本次大赛我们将“人工智能”作为第十一届全国高校信息搜索大<br />赛的主题，借助搜索竞技的比赛形式希望在考查参赛选手的信息搜索能力的同时<br />又使其在比赛竞技的过程中深入了解当前国家大力支持的新兴技术，通过了解<br />前沿科技的发展情况使其开拓思维探索其所学知识的创新方向，提升创新能力。<br />
                            <br />
                        </div>
                    </li>
                </ul>
            </div>
            <div class="main_cen">
                <p class="title">●活动时间</p>
                <img id="u14_img" class="img " src="images/u14.png">
                <p class="title">●奖品设置</p>
                <p class="cont-p">Ø 一等奖 （1 名），奖品：iPad Air 2</p>
                <p class="cont-p">Ø 二等奖 （2 名），奖品：航拍无人机</p>
                <p class="cont-p">Ø 三等奖 （3 名），奖品：拍立得</p>
                <p class="cont-p">Ø 优胜奖（24名），奖品：小米手环（光感版）</p>
                <p class="cont-p">非武汉本地高校的决赛选手可报销往返路费和住宿费（交通费上限500元，住宿费上限150元）</p>

                <input type="button" class="btn_submit to-know-game"
                       onclick="location.href='login.jsp'" value="点击参赛">
            </div>
        </div>
        <div class="clearit"></div>
    </div>
</div>

<!--相关链接区域:帮助-->
<div class="link-div">
    <div class="fl-title">大赛咨询：</div>
    <img src="images/code.png" class="codeimg" alt="二维码" title="欢迎扫描二维码" />
    <div class="the-link">
        <div class="text-area">
            <span class="lft-span">官方微信：ILA-WHU</span> <span class="lft-span">官方交流QQ群：629583197</span>
            <span class="lft-span">大赛邮箱：ila_whu@163.com</span>
        </div>
    </div>
</div>

<!--页脚:版权信息-->
<div class="Footer f14">
    <p>备注：本次第十一届“百度无限”全国高校信息搜索大赛解释权归武汉大学信息素养协会所有</p>
    <p>Copyright &copy; jiangchao</p>
</div>



</body>
</html>
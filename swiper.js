//参数parentElement表示父元素节点
//参数points表示points节点
//参数imgWidth表示每张轮播图的宽度
const swiper = function (parentElement, points, imgWidth) {
  let ulLeft = [],
    timer;
  // 将parentElement的第一个子元素克隆为parentElement的最后一个子元素
  parentElement.appendChild(parentElement.children[0].cloneNode(true));
  // 将parentElement的最后一个子元素克隆为parentElement的第一个子元素
  parentElement.insertBefore(
    parentElement.children[parentElement.children.length - 2].cloneNode(true),
    parentElement.children[0]
  );

  //给ulLeft数组添加元素
  for (let i = 0; i < parentElement.children.length; i++) {
    ulLeft.push(-imgWidth * i);
  }

  //parentElement内容显示为图1
  parentElement.style.left = ulLeft[1] + "px";

  const pointsFun = function () {
    for (let i = 0; i < points.length; i++) {
      //重置point的class属性
      points[i].className = "point";
      //给所有point添加鼠标移入事件
      points[i].onmouseover = function () {
        //先清除定时器
        clearTimeout(timer);
        clearInterval(swiperTimer);
        //获取上一个active的元素
        let active = document.getElementsByClassName("active")[0];
        //调用pointsFun，重置point的class属性
        pointsFun();
        //添加动画属性
        parentElement.style.transition = "left 1s";
        //给point添加选中状态
        this.className += " " + "active";
        //每次鼠标移动到points[0]上时，判断上一个元素是否为最后一个元素
        //如果是，则移动到图1副本的位置，同时设置定时器跳转到图一位置，定
        //时跳转时并无动画特效，所以视觉上是图6到图1无缝循环
        if (i === 0) {
          if (active === points[points.length - 1]) {
            //播放图6到图1副本的动画
            parentElement.style.left = ulLeft[ulLeft.length - 1] + "px";
            //将ul的transition属性设置为none,暂时关闭动画效果
            parentElement.style.transition = "none";
            //在动画进行的一瞬间，从图6跳到图6副本
            parentElement.style.left = ulLeft[0] + "px";
            //这时开启一个短暂一次性的定时器，用于播放从图6副本到图1的动画
            setTimeout(() => {
              parentElement.style.transition = "left 0.3s";
              parentElement.style.left = ulLeft[1] + "px";
            }, 100);
          } else {
            parentElement.style.left = ulLeft[i + 1] + "px";
          }
        }
        //每次鼠标移动到最后一个points上时，判断上一个选中的元素是否为
        //第一个元素如果是，则移动到图6副本的位置
        else if (i === points.length - 1) {
          if (active === points[0]) {
            //播放图1到图6副本的动画
            parentElement.style.left = ulLeft[0] + "px";
            //将ul的transition属性设置为none,暂时关闭动画效果
            parentElement.style.transition = "none";
            //在动画进行的一瞬间，从图1跳到图1副本
            parentElement.style.left = ulLeft[ulLeft.length - 1] + "px";
            //这时开启一个短暂一次性的定时器，用于播放从图1副本到图6的动画
            setTimeout(function () {
              parentElement.style.transition = "left 0.3s";
              parentElement.style.left = ulLeft[ulLeft.length - 2] + "px";
            }, 100);
          } else {
            parentElement.style.left = ulLeft[i + 1] + "px";
          }
        } else {
          parentElement.style.transition = "left 0.3s";
          parentElement.style.left = ulLeft[i + 1] + "px";
        }
      };
      //鼠标移出，从当前选中的point继续轮播
      points[i].onmouseout = function () {
        //js中传递参数为0开头的数字时候，存在转码的问题
        if (i == 0) {
          time("0");
          swiper1("0");
        } else {
          time(i);
          swiper1(i);
        }
      };
    }
  };
  pointsFun();
  //在未传参之前，作为swiper的初始参数
  let i = 1,
    swiperTimer;
  // 定时器
  // 开启自动轮播
  const swiper1 = function (index) {
    if (index) {
      parseInt(index);
      i = index + 1;
    }
    swiperTimer = setInterval(function () {
      i++;
      //给ul添加transition属性
      parentElement.style.transition = "left 0.3s";
      //使ul向左偏移-500px
      parentElement.style.left = ulLeft[i] + "px";
      //如果偏移到-3500，则表示到第一张的副本动画也播放完成了
      //此时应该跳转到第二张，开始新一轮循环
      //注意在跳转过程中是不需要动画效果的
      if (ulLeft[i] == undefined) {
        i = 1;
        //将ul的transition属性设置为none,暂时关闭动画效果
        parentElement.style.transition = "none";
        //此时已经从第一张的副本，跳转到了第一张，因为两张图片是一样的，且跳转速度极快，所以用户分辨不出区别
        parentElement.style.left = ulLeft[i] + "px";
        //这时开启一个短暂一次性的定时器，用于播放从第一张到第二张的动画
        //注意此定时器的运行时间不能太快，否则可能导致动画倒放
        setTimeout(function () {
          i++;
          parentElement.style.transition = "left 0.3s";
          parentElement.style.left = ulLeft[i] + "px";
        }, 100);
      }
    }, 1600);
  };
  swiper1();
  //在未传参之前，作为time的初始参数
  let pointsIndex = 0;
  //初始化point选中
  points[pointsIndex].className += " " + "active";
  //point定时器
  const time = function (index) {
    if (index) {
      parseInt(index);
      pointsIndex = index;
    }
    timer = setInterval(function () {
      //每次执行timer，先将point的class属性重置
      for (let i = 0; i < points.length; i++) {
        points[i].className = "point";
      }
      pointsIndex++;
      if (pointsIndex == points.length) {
        pointsIndex = 0;
      }
      points[pointsIndex].className += " " + "active";
    }, 1600);
  };
  time();
};

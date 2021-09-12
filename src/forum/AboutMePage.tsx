import { Component } from "react";
import { Linkedin } from "react-bootstrap-icons";

export default class AboutMePage extends Component<any, any> {
  render() {
    return (
      <div className="aboutme-wapper">
        <p className="card-text">
          <p>
          首先介绍一下我自己吧，我工作8年多了，一直在大科技公司写代码，目前在西雅图的谷歌工作，以前还在微软工作过。如果实习也算工作经历的话，我还在腾讯和搜狗工作过，前端后端大数据全都搞过，但都不精通。做过techlead，mentor过也合作过南亚某国人，学到了不少撕逼嘴炮之道。就说这些吧，其他的可以看我的Linkedin，另外大家有什么想知道的也可以发帖子问，只要不涉及隐私我都会知无不言。
          </p>
          <p><Linkedin style={{marginRight: "5px"}} /><a target="_blank" href="https://www.linkedin.com/in/byron-wang-9967197a/" rel="noreferrer">https://www.linkedin.com/in/byron-wang-9967197a/</a></p>
          <p>
            然后说说建立这个网站的初衷，谷歌的升职标准有一条是要为社区做点贡献，这个贡献可以是当志愿者，也可以是给小学生讲计算机相关的课，总之类似于公益相关的吧。别人都在努力为社(sheng)区(zhi)做贡(zhun)献(bei),
            我虽然不急于升职，但也要未雨绸缪吧。。但我这人有轻微社恐，那些与人打交道的怕是做不好，所以想到了建网站这个点子。
          </p>
          <p>
            这个网站的目的主要是给计算机领域还在上学或者初入职场的人答疑解惑，你可以问上学的时候应该怎么准备实习，也可以问职场里怎么升职最快，总之什么样的疑惑都可以问。你可以简要说说的你的个人情况，这样有助于回答者有针对性地回答。甚至对网站的建议都可以（网站是工作之余点灯熬夜做的，很粗糙，亟待改进）
          </p>
          <p>
            我会尽自己所能回答，如果我回答不了，我会找更有经验的同事(以及前同事，微软，Amazon，Facebook的都有)帮我解答，只是这些解答有可能是英文的。如
            果他们看不懂你们的中文题目，我会帮着翻译成英文。
          </p>
          <p>
            &nbsp;同时我也会经常发一些我写的感悟以及八卦公司内部的奇人轶事，技术和非技术的都会有。
          </p>
          <p>
            &nbsp;网站所有内容都免费，运营费用目前我自掏腰包，但我会试着申请谷歌的公益项目，所以希望大家多多支持，多发帖子，这样通过审核的概率才大。
          </p>
          <p></p>
        </p>
      </div>
    );
  }
}

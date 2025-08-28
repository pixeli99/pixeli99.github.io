// 论文数据管理 - 在这里添加/修改你的论文信息
const publications = [
    {
        title: "InfiGUIAgent: A Multimodal Generalist GUI Agent with Native Reasoning and Reflection",
        authors: "Yuhang Liu, <strong>Pengxiang Li</strong>, Zishu Wei, Congkai Xie, Xueyu Hu, Xinchen Xu, Shengyu Zhang, Xiaotian Han, Hongxia Yang, Fei Wu",
        venue: "arXiv 2025",
        description: "A multimodal generalist GUI agent that combines native reasoning and reflection capabilities for advanced GUI automation tasks.",
        image: "./images/papers/infigui-agent.png",
        links: {
            paper: "https://arxiv.org/abs/2501.04575",
            code: "https://github.com/InfiXAI/InfiGUIAgent",
            project: null,
            video: null
        }
    },
    {
        title: "InfiGUI-R1: Advancing Multimodal GUI Agents from Reactive Actors to Deliberative Reasoners",
        authors: "Yuhang Liu, <strong>Pengxiang Li</strong>, Congkai Xie, Xavier Hu, Xiaotian Han, Shengyu Zhang, Hongxia Yang, Fei Wu",
        venue: "arXiv 2025",
        description: "Transforms GUI agents from simple reactive systems to deliberative reasoners capable of complex planning and decision-making.",
        image: "./images/papers/infir1.png",
        links: {
            paper: "https://arxiv.org/abs/2504.14239",
            code: "https://github.com/InfiXAI/InfiGUI-R1",
            project: null,
            video: null
        }
    },
    {
        title: "Adaptive Classifier-Free Guidance via Dynamic Low-Confidence Masking",
        authors: "<strong>Pengxiang Li</strong>, Shilin Yan, Joey Tsai, Renrui Zhang, Ruichuan An, Ziyu Guo, Xiaowei Gao",
        venue: "arXiv 2025",
        description: "We propose Adaptive Classifier-Free Guidance (A-CFG), which dynamically adapts CFG by re-masking tokens with low model confidence during iterative diffusion-based generation. This localized, dynamic unconditional input improves controllability and quality, achieving up to 3.9 point gains on GPQA compared to standard CFG.",
        image: "./images/papers/acfg.png",
        links: {
            paper: "https://arxiv.org/pdf/2505.20199",
            code: null,
            project: null,
            video: null
        }
    },
    {
        title: "The Curse of Depth in Large Language Models",
        authors: "Wenfang Sun, Xinyuan Song, <strong>Pengxiang Li</strong>, Lu Yin, Yefeng Zheng, Shiwei Liu",
        venue: "arXiv 2025",
        description: "Investigates the depth scaling challenges in LLMs and proposes solutions for training deeper and more effective models.",
        image: "./images/papers/cod.png",
        links: {
            paper: "https://arxiv.org/abs/2502.05795",
            code: "https://github.com/lmsdss/LayerNorm-Scaling",
            project: null,
            video: null
        }
    },
    {
        title: "Mix-LN: Unleashing the Power of Deeper Layers by Combining Pre-LN and Post-LN",
        authors: "<strong>Pengxiang Li</strong>, Lu Yin, Shiwei Liu",
        venue: "ICLR 2025",
        description: "A novel layer normalization technique that combines Pre-LN and Post-LN to enable training of deeper and more powerful language models.",
        image: "./images/papers/mixln.png",
        links: {
            paper: "https://arxiv.org/abs/2412.13795",
            code: "https://github.com/pixeli99/MixLN",
            project: null,
            video: null
        }
    },
    {
        title: "Outlier-weighed Layerwise Sampling for LLM Fine-tuning",
        authors: "<strong>Pengxiang Li</strong>, Lu Yin, Xiaowei Gao, Shiwei Liu",
        venue: "ACL 2025 Findings",
        description: "We propose Outlier-weighed Layerwise Sampling (OWS), a memory-efficient fine-tuning method that selectively updates outlier-heavy layers with low-rank projected gradients, achieving better accuracy than full fine-tuning while using significantly less memory.",
        image: "./images/papers/ows.png",
        links: {
            paper: "https://arxiv.org/abs/2405.18380",
            code: "https://github.com/pixeli99/OWS",
            project: null,
            video: null
        }
    },
    {
        title: "Automated Evaluation of Large Vision-Language Models on Self-Driving Corner Cases",
        authors: "Kai Chen, Yanze Li, Wenhua Zhang, Yanxin Liu, <strong>Pengxiang Li</strong>, Ruiyuan Gao, Lanqing Hong, Meng Tian, Xinhai Zhao, Zhenguo Li, Dit-Yan Yeung, Huchuan Lu, Xu Jia",
        venue: "WACV 2025",
        description: "We propose CODA-LM, the first benchmark for automated evaluation of LVLMs on self-driving corner cases. Using hierarchical scene annotations and leveraging LLM judges, CODA-LM enables scalable, quantifiable evaluation. We further develop CODA-VLM, a new LVLM for driving that surpasses existing open-source models.",
        image: "./images/papers/codalm.png",
        links: {
            paper: "https://arxiv.org/abs/2404.10595",
            code: "https://github.com/DLUT-LYZ/CODA-LM",
            project: "https://coda-dataset.github.io/coda-lm/",
            video: null
        }
    },
    {
        title: "TrackDiffusion: Tracklet-Conditioned Video Generation via Diffusion Models",
        authors: "<strong>Pengxiang Li</strong>, Kai Chen, Zhili Liu, Ruiyuan Gao, Lanqing Hong, Guo Zhou, Hua Yao, Dit-Yan Yeung, Huchuan Lu, Xu Jia",
        venue: "WACV 2025",
        description: "We introduce TrackDiffusion, a novel video generation framework with tracklet-conditioned motion control. It enables fine-grained trajectory guidance and enforces inter-frame consistency of multiple objects via an instance enhancer. Generated videos not only achieve high realism but can also enhance object tracking models when used as training data.",
        image: "./images/papers/trackdiff.png",
        links: {
            paper: "https://arxiv.org/pdf/2312.00651",
            code: "https://github.com/pixeli99/TrackDiffusion",
            project: "https://kaichen1998.github.io/projects/trackdiffusion/",
            video: null
        }
    },
];

// 渲染论文列表
function renderPublications() {
    const publicationList = document.querySelector('.publication-list');
    if (!publicationList) return;
    
    publicationList.innerHTML = '';
    
    publications.forEach(pub => {
        const publicationDiv = document.createElement('div');
        publicationDiv.className = 'publication';
        
        // 构建链接HTML
        let linksHTML = '';
        if (pub.links.paper && pub.links.paper !== '#') {
            linksHTML += `<a href="${pub.links.paper}" class="link-button" target="_blank">Paper</a>`;
        }
        if (pub.links.code) {
            linksHTML += `<a href="${pub.links.code}" class="link-button" target="_blank">Code</a>`;
        }
        if (pub.links.project) {
            linksHTML += `<a href="${pub.links.project}" class="link-button" target="_blank">Project</a>`;
        }
        if (pub.links.video) {
            linksHTML += `<a href="${pub.links.video}" class="link-button" target="_blank">Video</a>`;
        }
        
        publicationDiv.innerHTML = `
            <div class="publication-image">
                <img src="${pub.image || ''}" alt="${pub.title}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <div class="publication-info">
                <h4 class="publication-title">${pub.title}</h4>
                <p class="publication-authors">${pub.authors}</p>
                <p class="publication-venue">${pub.venue}</p>
                <p class="publication-desc">${pub.description}</p>
                <div class="publication-links">${linksHTML}</div>
            </div>
        `;
        
        publicationList.appendChild(publicationDiv);
    });
}

// 页面加载完成后渲染
document.addEventListener('DOMContentLoaded', renderPublications);
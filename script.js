// CLI Terminal Portfolio - Interactive Command Line Interface
// Author: Pengxiang Li

class TerminalPortfolio {
    constructor() {
        this.currentInput = '';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.isBootComplete = false;
        this.commandCount = 0;
        
        // Command definitions
        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            skills: this.showSkills.bind(this),
            research: this.showResearch.bind(this),
            projects: this.showProjects.bind(this),
            publications: this.showPublications.bind(this),
            contact: this.showContact.bind(this),
            cv: this.downloadCV.bind(this),
            photo: this.showPhoto.bind(this),
            clear: this.clearTerminal.bind(this),
            theme: this.toggleTheme.bind(this),
            whoami: this.whoami.bind(this),
            pwd: this.pwd.bind(this),
            ls: this.ls.bind(this),
            cat: this.cat.bind(this),
            neofetch: this.neofetch.bind(this),
            exit: this.exit.bind(this)
        };

        this.aliases = {
            '?': 'help',
            'info': 'about',
            'pic': 'photo',
            'image': 'photo',
            'work': 'projects',
            'papers': 'publications',
            'email': 'contact',
            'resume': 'cv',
            'cls': 'clear'
        };

        this.init();
    }

    init() {
        this.setupTheme();
        this.setupEventListeners();
        this.setupStatusBar();
        this.startBootSequence();
    }

    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', this.toggleTheme.bind(this));
        
        // Command panel toggle
        document.getElementById('panel-toggle').addEventListener('click', this.toggleCommandPanel.bind(this));
        
        // Command panel items
        document.querySelectorAll('.cmd-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const command = e.currentTarget.getAttribute('data-command');
                this.executeCommand(command);
            });
        });
        
        // Mobile command buttons
        document.querySelectorAll('.mobile-cmd').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const command = e.target.getAttribute('data-command');
                this.executeCommand(command);
            });
        });
    }

    startBootSequence() {
        setTimeout(() => {
            this.isBootComplete = true;
            this.showWelcomeMessage();
        }, 3000);
    }

    showWelcomeMessage() {
        const welcomeText = `Welcome to my interactive portfolio! 🚀

I'm Pengxiang Li, an AI researcher specializing in Computer Vision.
Type 'help' to see available commands, or try 'about' to learn more about me.`;
        this.addOutput(welcomeText, 'info');
    }

    handleKeyDown(event) {
        if (!this.isBootComplete) return;

        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                this.executeCurrentCommand();
                break;
                
            case 'Backspace':
                event.preventDefault();
                if (this.currentInput.length > 0) {
                    this.currentInput = this.currentInput.slice(0, -1);
                    this.updateInputDisplay();
                }
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                this.navigateHistory(-1);
                break;
                
            case 'ArrowDown':
                event.preventDefault();
                this.navigateHistory(1);
                break;
                
            default:
                if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
                    event.preventDefault();
                    this.currentInput += event.key;
                    this.updateInputDisplay();
                }
                break;
        }
    }

    executeCurrentCommand() {
        const command = this.currentInput.trim();
        if (command) {
            this.addCommandToHistory(command);
            this.executeCommand(command);
        }
        this.currentInput = '';
        this.updateInputDisplay();
        this.historyIndex = -1;
    }

    executeCommand(commandStr) {
        const [cmd, ...args] = commandStr.toLowerCase().split(' ');
        const resolvedCmd = this.aliases[cmd] || cmd;
        
        // Add command to display
        this.addOutput(`pengxiang@polyu-ai:~$ ${commandStr}`, 'command-input');
        
        // Update command count
        this.commandCount++;
        this.updateStatusBar();
        
        // Auto scroll to bottom after command execution
        this.scrollToBottom();
        
        if (this.commands[resolvedCmd]) {
            this.commands[resolvedCmd](args);
        } else {
            this.addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    }

    // Command implementations
    showHelp() {
        const helpText = `Available commands:

  help          Show this help message
  about         Learn about me and my background
  skills        View my technical skills
  research      See my research interests
  projects      Browse my notable projects
  publications  View my academic publications
  contact       Get my contact information
  cv            Download my resume/CV
  clear         Clear the terminal screen
  theme         Toggle light/dark theme
  
Fun commands:
  whoami, pwd, ls, cat, neofetch, exit`;

        this.addOutput(helpText, 'info');
    }

    showAbout() {
        const aboutText = `Pengxiang Li 李鹏翔 - PhD Student in AI

🎓 Current: PhD in Artificial Intelligence, The Hong Kong Polytechnic University
🎓 Previous: MSc in AI, Dalian University of Technology (supervised by Prof. Huchuan Lu)
📍 Location: Hong Kong

About me: I'm a passionate researcher in AI with focus on LLMs, Diffusion Models, 
and GUI Agents. My work spans across multiple domains including video generation, 
multimodal understanding, and automated evaluation systems.

📚 Publications: 15+ papers with 180+ citations
🏆 Recent work includes automated evaluation of vision-language models, TrackDiffusion 
   for video generation, and InfiGUI series for multimodal GUI agents.`;

        this.addOutput(aboutText, 'success');
    }

    showSkills() {
        const skillsText = `Technical Skills & Research Areas:

🧠 Core Research Areas:
   • Large Language Models (LLMs)
   • Diffusion Models & Video Generation
   • Multimodal GUI Agents
   • Vision-Language Models
   • Automated Evaluation Systems
   • Computer Vision & Tracking

💻 Programming Languages:
   • Python (Expert) - Primary research language
   • C++ (Advanced) - Performance optimization
   • JavaScript (Intermediate) - Web development
   • MATLAB (Intermediate) - Academic research

🛠️ Frameworks & Tools:
   • PyTorch, TensorFlow, HuggingFace
   • OpenCV, PIL, CUDA
   • Git, Docker, Linux
   • Weights & Biases, TensorBoard

📊 Specializations:
   • Deep Learning Model Design
   • Multimodal AI Systems
   • Video Processing & Generation
   • GUI Automation & Understanding
   • Research & Academic Writing`;

        this.addOutput(skillsText, 'info');
    }

    showResearch() {
        const researchText = `Research Interests & Current Focus:

🤖 Large Language Models (LLMs):
   Focus on layer normalization techniques, outlier-weighted sampling, and 
   the curse of depth problem in large language models.

🎨 Diffusion Models & Video Generation:
   TrackDiffusion for tracklet-conditioned video generation, MoTrans for 
   customized motion transfer, and DreamMix for enhanced image inpainting.

🖥️ Multimodal GUI Agents:
   InfiGUI series - advancing from reactive actors to deliberative reasoners
   with native reasoning and reflection capabilities.

📊 Automated Evaluation:
   Self-driving corner cases evaluation for large vision-language models,
   creating robust benchmarks for multimodal AI systems.

🎯 Current Projects:
   • Advanced evaluation frameworks for VLMs
   • Next-generation GUI automation agents  
   • Reinforcement learning for trajectory generation
   • Adaptive classifier-free guidance methods`;

        this.addOutput(researchText, 'accent');
    }

    showProjects() {
        const projectsText = `Featured Research Projects:

🤖 InfiGUI Series - Multimodal GUI Agents
   Revolutionary GUI agents with native reasoning and reflection
   Status: Active | Venue: Preprint 2025
   Tech: LLMs, Computer Vision, Reinforcement Learning

🎥 TrackDiffusion - Video Generation Framework
   Tracklet-conditioned video generation via diffusion models
   Status: Published | Venue: WACV 2025
   Tech: Diffusion Models, PyTorch, Video Processing

📊 VLM Evaluation Framework
   Automated evaluation for large vision-language models on corner cases
   Status: Published | Venue: WACV 2025  
   Tech: Vision-Language Models, Evaluation Metrics

🧠 Mix-LN: Layer Normalization Innovation
   Unleashing deeper layers by combining Pre-LN and Post-LN
   Status: Published | Venue: ICLR 2025
   Tech: Transformer Architecture, Deep Learning

🎨 MoTrans & DreamMix
   Customized motion transfer and enhanced image inpainting
   Status: Published | Venue: ACM MM 2024
   Tech: Diffusion Models, Image Processing`;

        this.addOutput(projectsText, 'warning');
    }

    showPublications() {
        const publicationsText = `Recent Publications (Selected):

📚 2025 Publications:
• "InfiGUI-R1: Advancing Multimodal GUI Agents..." | Preprint
• "InfiGUIAgent: A Multimodal Generalist GUI Agent..." | Preprint  
• "Mix-LN: Unleashing the Power of Deeper Layers..." | ICLR
• "The Curse of Depth in Large Language Models" | Preprint

📚 2024 Publications:
• "Automated Evaluation of Large Vision-Language Models..." | WACV2025 (52 citations)
• "TrackDiffusion: Tracklet-Conditioned Video Generation..." | WACV2025 (32 citations)
• "MoTrans: Customized Motion Transfer..." | ACM MM 2024
• "DreamMix: Decoupling Object Attributes..." | Preprint
• "Outlier-weighed Layerwise Sampling for LLM Fine-tuning" | ACL Findings

📊 Research Impact:
• Total Publications: 15+ papers
• Total Citations: 180+ (Google Scholar)
• h-index: Rapidly growing
• Research Areas: 3 major domains

🔗 Full List: scholar.google.com/citations?user=rUp_4RgAAAAJ`;

        this.addOutput(publicationsText, 'success');
    }

    showContact() {
        const contactText = `Contact Information:

📧 Email: lipengxiang@mail.dlut.edu.cn (Verified)
🏫 Institution: The Hong Kong Polytechnic University
🎓 Status: PhD Student in Artificial Intelligence
📍 Location: Hong Kong

🔗 Academic Profiles:
   Google Scholar: scholar.google.com/citations?user=rUp_4RgAAAAJ
   GitHub: github.com/pixeli99
   University Profile: Available upon request

💬 Research Collaboration Interests:
   • Large Language Models & Evaluation
   • Diffusion Models & Video Generation  
   • Multimodal GUI Agents & Automation
   • Cross-modal Understanding & Reasoning

📬 Response Time: Usually within 2-3 business days
🌐 Languages: English, Chinese (Mandarin)

Feel free to reach out for research discussions, collaboration opportunities, 
or academic exchanges!`;

        this.addOutput(contactText, 'info');
    }

    downloadCV() {
        this.addOutput('Opening CV download...', 'success');
        setTimeout(() => {
            window.open('CV/CV_Pengxiang_Li.pdf', '_blank');
            this.addOutput('✓ CV download initiated.', 'success');
        }, 500);
    }

    showPhoto() {
        this.addOutput('Loading photo...', 'info');
        
        // Create photo display
        setTimeout(() => {
            const photoHtml = `
<div class="photo-display">
    <div class="photo-ascii">
╔═══════════════════════════════════════╗
║            📸 Photo Display           ║
╚═══════════════════════════════════════╝
    </div>
    <div class="photo-container">
        <img src="https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=rUp_4RgAAAAJ&citpid=6" 
             alt="Pengxiang Li" 
             class="photo-image"
             onload="this.style.opacity=1"
             style="opacity:0; transition: opacity 0.3s ease;">
        <div class="photo-caption">
            Pengxiang Li - AI Researcher at IIAU Lab<br>
            Dalian University of Technology
        </div>
    </div>
    <div class="photo-ascii">
╔═══════════════════════════════════════╗
║  "Bridging AI and Human Intelligence" ║
╚═══════════════════════════════════════╝
    </div>
</div>`;
            
            this.addRawOutput(photoHtml);
        }, 800);
    }

    clearTerminal() {
        document.getElementById('command-history').innerHTML = '';
        this.addOutput('Terminal cleared.', 'success');
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateStatusBar();
        this.addOutput(`Theme switched to ${this.currentTheme} mode.`, 'success');
    }

    toggleCommandPanel() {
        const panel = document.getElementById('panel-content');
        const toggle = document.getElementById('panel-toggle');
        
        if (panel.classList.contains('collapsed')) {
            panel.classList.remove('collapsed');
            toggle.textContent = '−';
        } else {
            panel.classList.add('collapsed');
            toggle.textContent = '+';
        }
    }

    // Fun commands
    whoami() { this.addOutput('pengxiang', 'success'); }
    pwd() { this.addOutput('/home/pengxiang/portfolio', 'success'); }
    ls() { this.addOutput('research/ projects/ publications/ CV_Pengxiang_Li.pdf', 'success'); }
    
    cat(args) {
        const file = args[0];
        if (file === 'README.md') {
            this.addOutput('# Pengxiang Li - AI Researcher\nWelcome to my portfolio!', 'success');
        } else {
            this.addOutput(`cat: ${file}: No such file or directory`, 'error');
        }
    }

    neofetch() {
        const output = `pengxiang@ai-lab
OS: Research Linux | GPU: NVIDIA RTX Research
CPU: Neural Processing Unit | Memory: 32GB Knowledge
Research Areas: 4 | Projects: 10+ | Publications: 5+`;
        this.addOutput(output, 'accent');
    }

    exit() {
        this.addOutput('Thanks for visiting! 👋', 'success');
    }

    // Utility methods
    addCommandToHistory(command) {
        this.commandHistory.unshift(command);
        if (this.commandHistory.length > 50) this.commandHistory.pop();
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex += direction;
        if (this.historyIndex < -1) this.historyIndex = -1;
        if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length - 1;
        }
        
        this.currentInput = this.historyIndex === -1 ? '' : this.commandHistory[this.historyIndex];
        this.updateInputDisplay();
    }

    updateInputDisplay() {
        document.getElementById('input-text').textContent = this.currentInput;
    }

    addOutput(text, className = '') {
        const historyEl = document.getElementById('command-history');
        const outputEl = document.createElement('div');
        outputEl.className = `command-entry fade-in`;
        
        if (className === 'command-input') {
            outputEl.innerHTML = `<div class="command-input">${this.escapeHtml(text)}</div>`;
        } else {
            outputEl.innerHTML = `<div class="command-output ${className}">${this.escapeHtml(text)}</div>`;
        }
        
        historyEl.appendChild(outputEl);
        this.scrollToBottom();
    }

    addRawOutput(html) {
        const historyEl = document.getElementById('command-history');
        const outputEl = document.createElement('div');
        outputEl.className = `command-entry fade-in`;
        outputEl.innerHTML = `<div class="command-output">${html}</div>`;
        historyEl.appendChild(outputEl);
        this.scrollToBottom();
    }

    escapeHtml(text) {
        return text.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;',
            "'": '&#39;', '"': '&quot;'
        }[tag] || tag));
    }

    scrollToBottom() {
        const content = document.getElementById('terminal-content');
        setTimeout(() => {
            content.scrollTop = content.scrollHeight;
        }, 100);
    }

    setupStatusBar() {
        this.updateStatusBar();
        this.updateTime();
        
        // Update time every second
        setInterval(() => {
            this.updateTime();
        }, 1000);

        // Make theme indicator clickable
        document.querySelector('.theme-indicator').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    updateStatusBar() {
        const commandCountEl = document.getElementById('command-count');
        const themeStatusEl = document.getElementById('theme-status');
        const themeIconEl = document.querySelector('.theme-indicator .status-icon');
        
        if (commandCountEl) {
            commandCountEl.textContent = `${this.commandCount} commands`;
        }
        
        if (themeStatusEl) {
            themeStatusEl.textContent = this.currentTheme === 'dark' ? 'Dark' : 'Light';
        }
        
        if (themeIconEl) {
            themeIconEl.textContent = this.currentTheme === 'dark' ? '🌙' : '☀️';
        }
    }

    updateTime() {
        const timeEl = document.getElementById('current-time');
        if (timeEl) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            timeEl.textContent = timeString;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => new TerminalPortfolio());

console.log('🚀 Terminal Portfolio loaded! Try typing "help" in the terminal.');

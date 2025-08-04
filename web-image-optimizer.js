// 网页端图片优化工具
// 在前端自动压缩图片，减少上传时间和服务器负担

class WebImageOptimizer {
    constructor(options = {}) {
        this.maxWidth = options.maxWidth || 1200;
        this.maxHeight = options.maxHeight || 800;
        this.quality = options.quality || 0.8;
        this.maxSizeMB = options.maxSizeMB || 2;
        this.outputFormat = options.outputFormat || 'jpeg';
    }

    /**
     * 优化图片文件
     * @param {File} file - 原始图片文件
     * @returns {Promise<File>} - 优化后的图片文件
     */
    async optimizeImage(file) {
        return new Promise((resolve, reject) => {
            // 检查文件类型
            if (!file.type.startsWith('image/')) {
                reject(new Error('文件不是有效的图片格式'));
                return;
            }

            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            img.onload = () => {
                try {
                    // 计算新尺寸
                    const { width: newWidth, height: newHeight } = this.calculateNewDimensions(
                        img.width,
                        img.height
                    );

                    // 设置画布尺寸
                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    // 绘制缩放后的图片
                    ctx.fillStyle = 'white'; // 白色背景（针对透明PNG）
                    ctx.fillRect(0, 0, newWidth, newHeight);
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    // 转换为Blob
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('图片压缩失败'));
                                return;
                            }

                            // 创建新的File对象
                            const optimizedFile = new File(
                                [blob],
                                this.generateFileName(file.name),
                                {
                                    type: `image/${this.outputFormat}`,
                                    lastModified: Date.now()
                                }
                            );

                            // 检查文件大小
                            const sizeMB = optimizedFile.size / (1024 * 1024);
                            console.log(`图片优化完成: ${img.width}x${img.height} → ${newWidth}x${newHeight}, ${(file.size / (1024 * 1024)).toFixed(2)}MB → ${sizeMB.toFixed(2)}MB`);

                            resolve(optimizedFile);
                        },
                        `image/${this.outputFormat}`,
                        this.quality
                    );
                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = () => {
                reject(new Error('图片加载失败'));
            };

            // 加载图片
            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * 计算新的图片尺寸
     */
    calculateNewDimensions(originalWidth, originalHeight) {
        let newWidth = originalWidth;
        let newHeight = originalHeight;

        // 检查是否需要缩放
        if (originalWidth > this.maxWidth || originalHeight > this.maxHeight) {
            const aspectRatio = originalWidth / originalHeight;

            if (originalWidth > originalHeight) {
                // 横图
                newWidth = this.maxWidth;
                newHeight = Math.round(this.maxWidth / aspectRatio);
            } else {
                // 竖图
                newHeight = this.maxHeight;
                newWidth = Math.round(this.maxHeight * aspectRatio);
            }

            // 再次检查尺寸限制
            if (newHeight > this.maxHeight) {
                newHeight = this.maxHeight;
                newWidth = Math.round(this.maxHeight * aspectRatio);
            }
            if (newWidth > this.maxWidth) {
                newWidth = this.maxWidth;
                newHeight = Math.round(this.maxWidth / aspectRatio);
            }
        }

        return { width: newWidth, height: newHeight };
    }

    /**
     * 生成优化后的文件名
     */
    generateFileName(originalName) {
        const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
        return `${nameWithoutExt}.${this.outputFormat === 'jpeg' ? 'jpg' : this.outputFormat}`;
    }

    /**
     * 批量优化多个图片
     */
    async optimizeMultipleImages(files) {
        const results = [];
        
        for (let i = 0; i < files.length; i++) {
            try {
                const optimizedFile = await this.optimizeImage(files[i]);
                results.push({
                    original: files[i],
                    optimized: optimizedFile,
                    success: true
                });
            } catch (error) {
                results.push({
                    original: files[i],
                    error: error.message,
                    success: false
                });
            }
        }

        return results;
    }

    /**
     * 创建预览URL
     */
    createPreviewURL(file) {
        return URL.createObjectURL(file);
    }

    /**
     * 获取图片信息
     */
    async getImageInfo(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height,
                    size: file.size,
                    type: file.type,
                    name: file.name
                });
                URL.revokeObjectURL(img.src);
            };

            img.onerror = () => {
                reject(new Error('无法加载图片'));
                URL.revokeObjectURL(img.src);
            };

            img.src = URL.createObjectURL(file);
        });
    }
}

// 使用示例和工具函数
const ImageOptimizerUtils = {
    /**
     * 为文件输入框添加自动优化功能
     */
    enhanceFileInput(inputElement, options = {}) {
        const optimizer = new WebImageOptimizer(options);
        
        // 存储原始的change事件处理器
        const originalOnChange = inputElement.onchange;
        
        inputElement.addEventListener('change', async (event) => {
            const files = Array.from(event.target.files);
            const imageFiles = files.filter(file => file.type.startsWith('image/'));
            
            if (imageFiles.length === 0) {
                if (originalOnChange) originalOnChange.call(inputElement, event);
                return;
            }

            // 显示处理进度
            console.log(`开始优化 ${imageFiles.length} 张图片...`);
            
            try {
                const results = await optimizer.optimizeMultipleImages(imageFiles);
                const optimizedFiles = results
                    .filter(result => result.success)
                    .map(result => result.optimized);

                // 创建新的FileList（模拟）
                const dataTransfer = new DataTransfer();
                
                // 添加非图片文件（保持不变）
                files.filter(file => !file.type.startsWith('image/')).forEach(file => {
                    dataTransfer.items.add(file);
                });
                
                // 添加优化后的图片
                optimizedFiles.forEach(file => {
                    dataTransfer.items.add(file);
                });

                // 更新文件输入框
                inputElement.files = dataTransfer.files;

                // 触发原始事件处理器
                if (originalOnChange) {
                    const newEvent = new Event('change', { bubbles: true });
                    Object.defineProperty(newEvent, 'target', {
                        value: inputElement,
                        enumerable: true
                    });
                    originalOnChange.call(inputElement, newEvent);
                }

                console.log('图片优化完成！');
            } catch (error) {
                console.error('图片优化失败:', error);
                // 如果优化失败，使用原始文件
                if (originalOnChange) originalOnChange.call(inputElement, event);
            }
        });
    },

    /**
     * 创建拖拽上传区域
     */
    createDropZone(element, options = {}) {
        const optimizer = new WebImageOptimizer(options);
        
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            element.classList.add('drag-over');
        });

        element.addEventListener('dragleave', (e) => {
            e.preventDefault();
            element.classList.remove('drag-over');
        });

        element.addEventListener('drop', async (e) => {
            e.preventDefault();
            element.classList.remove('drag-over');

            const files = Array.from(e.dataTransfer.files);
            const imageFiles = files.filter(file => file.type.startsWith('image/'));

            if (imageFiles.length > 0) {
                const results = await optimizer.optimizeMultipleImages(imageFiles);
                
                // 触发自定义事件
                const customEvent = new CustomEvent('imagesOptimized', {
                    detail: { results }
                });
                element.dispatchEvent(customEvent);
            }
        });
    },

    /**
     * 格式化文件大小
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.WebImageOptimizer = WebImageOptimizer;
    window.ImageOptimizerUtils = ImageOptimizerUtils;
}

// 支持模块导入
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WebImageOptimizer, ImageOptimizerUtils };
}
import fs from 'fs';
import path from 'path';

export interface PDFContent {
  title: string;
  descriptions: string[];
  imageUrls: string[];
  projectDetails: {
    landArea: number;
    width: number;
    depth: number;
    neighborhood: string;
    propertyType: string;
    designStyle: string;
  };
  materials?: {
    exterior: string[];
    interior: string[];
  };
  landscaping?: string[];
  estimatedCost?: {
    total: string;
    breakdown: {
      structure: string;
      finishes: string;
      landscaping: string;
    };
  };
}

export async function generateDesignPDF(content: PDFContent): Promise<string> {
  try {
    // For now, we'll create a simple HTML content that can be converted to PDF
    // In a real implementation, you would use a library like puppeteer or jsPDF
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>${content.title}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
            direction: rtl;
            text-align: right;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #10b981;
            padding-bottom: 20px;
        }
        .project-details {
            background: #f8fafc;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .description {
            margin: 20px 0;
            line-height: 1.6;
        }
        .images {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .image-container {
            text-align: center;
        }
        .image-container img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>وصل للتقنيات العقارية</h1>
        <h2>${content.title}</h2>
        <p>تصميم معماري بتقنية الذكاء الاصطناعي</p>
    </div>
    
    <div class="project-details">
        <h3>تفاصيل المشروع</h3>
        <p><strong>مساحة الأرض:</strong> ${content.projectDetails.landArea} متر مربع</p>
        <p><strong>العرض:</strong> ${content.projectDetails.width} متر</p>
        <p><strong>العمق:</strong> ${content.projectDetails.depth} متر</p>
        <p><strong>الحي:</strong> ${content.projectDetails.neighborhood}</p>
        <p><strong>نوع العقار:</strong> ${content.projectDetails.propertyType}</p>
    </div>
    
    ${content.descriptions.map((desc, index) => `
        <div class="description">
            <h3>وصف التصميم ${index + 1}</h3>
            <p>${desc}</p>
        </div>
    `).join('')}
    
    ${content.materials ? `
    <div class="materials-section">
        <h3 style="color: #10b981; border-bottom: 1px solid #10b981; padding-bottom: 10px;">🏗️ المواد المقترحة والمعتمدة</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
            <div style="background: #f0f9f4; padding: 15px; border-radius: 8px;">
                <h4 style="color: #059669;">🧱 التكسيات الخارجية:</h4>
                <ul>
                    ${content.materials.exterior?.map(material => `<li>✓ ${material}</li>`).join('') || ''}
                </ul>
            </div>
            <div style="background: #eff6ff; padding: 15px; border-radius: 8px;">
                <h4 style="color: #1d4ed8;">🏡 التشطيبات الداخلية:</h4>
                <ul>
                    ${content.materials.interior?.map(material => `<li>✓ ${material}</li>`).join('') || ''}
                </ul>
            </div>
        </div>
    </div>
    ` : ''}
    
    ${content.landscaping ? `
    <div class="landscaping-section">
        <h3 style="color: #059669; border-bottom: 1px solid #059669; padding-bottom: 10px;">🌳 التشجير والمناظر الطبيعية</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
            ${content.landscaping.map(plant => `
                <div style="background: #f0f9f4; padding: 10px; border-radius: 8px; border: 1px solid #10b981;">
                    <span style="color: #059669;">🌱 ${plant}</span>
                </div>
            `).join('')}
        </div>
    </div>
    ` : ''}
    
    ${content.estimatedCost ? `
    <div class="cost-section">
        <h3 style="color: #d97706; border-bottom: 1px solid #d97706; padding-bottom: 10px;">💰 التكلفة التقديرية الشاملة</h3>
        <div style="text-align: center; margin: 20px 0;">
            <div style="background: #fef3c7; border: 2px solid #d97706; border-radius: 10px; padding: 20px; display: inline-block;">
                <h2 style="color: #92400e; margin: 0;">💸 ${content.estimatedCost.total}</h2>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0;">
            <div style="background: #fef3c7; padding: 15px; text-align: center; border-radius: 8px;">
                <div style="font-size: 24px;">🏗️</div>
                <h4 style="color: #92400e;">الهيكل الإنشائي</h4>
                <p style="font-weight: bold; color: #d97706;">${content.estimatedCost.breakdown?.structure}</p>
            </div>
            <div style="background: #fef3c7; padding: 15px; text-align: center; border-radius: 8px;">
                <div style="font-size: 24px;">🎨</div>
                <h4 style="color: #92400e;">التشطيبات والتكسيات</h4>
                <p style="font-weight: bold; color: #d97706;">${content.estimatedCost.breakdown?.finishes}</p>
            </div>
            <div style="background: #fef3c7; padding: 15px; text-align: center; border-radius: 8px;">
                <div style="font-size: 24px;">🌿</div>
                <h4 style="color: #92400e;">التشجير والحدائق</h4>
                <p style="font-weight: bold; color: #d97706;">${content.estimatedCost.breakdown?.landscaping}</p>
            </div>
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <p style="font-size: 12px; color: #92400e; background: #fef3c7; padding: 8px; border-radius: 5px; display: inline-block;">
                * الأسعار تقديرية حسب أسعار السوق السعودي 2025 وقابلة للتغيير
            </p>
        </div>
    </div>
    ` : ''}
    
    <div class="images">
        ${content.imageUrls.map((url, index) => `
            <div class="image-container">
                <img src="${url}" alt="تصميم ${index + 1}" />
                <p>تصميم ${index + 1}</p>
            </div>
        `).join('')}
    </div>
    
    <div style="text-align: center; margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p>تم إنشاء هذا التصميم بواسطة وصل للتقنيات العقارية</p>
        <p>للمزيد من المعلومات: info@smartrealestate.sa</p>
    </div>
</body>
</html>
    `;
    
    // In a real implementation, you would convert this HTML to PDF
    // For now, we'll save it as an HTML file and return a URL
    const fileName = `design_${Date.now()}.html`;
    const filePath = path.join(process.cwd(), 'public', fileName);
    
    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    
    return `/public/${fileName}`;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("فشل في إنشاء ملف PDF. يرجى المحاولة مرة أخرى.");
  }
}

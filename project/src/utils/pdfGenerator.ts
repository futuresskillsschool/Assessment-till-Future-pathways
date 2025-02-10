import { jsPDF } from 'jspdf';
import { AssessmentResult } from '../types/results';

export async function generateResultsPDF(
  result: AssessmentResult | null, 
  userData?: any,
  multiSelectAnswers?: Record<string, string[]>
): Promise<void> {
  if (!result) return;

  try {
    const pdf = new jsPDF();
    let yOffset = 20;

    // Add header
    pdf.setFontSize(24);
    pdf.setTextColor(100, 50, 200);
    pdf.text('Career Assessment Results', 20, yOffset);
    yOffset += 20;

    // Add user info if available
    if (userData) {
      pdf.setFontSize(12);
      pdf.text(`Name: ${userData.name}`, 20, yOffset);
      yOffset += 10;
      pdf.text(`Email: ${userData.email}`, 20, yOffset);
      yOffset += 20;
    }

    // Add personality traits
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Personality Profile', 20, yOffset);
    yOffset += 10;

    result.psychometric.personalityTraits.forEach(trait => {
      if (yOffset > 250) {
        pdf.addPage();
        yOffset = 20;
      }

      pdf.setFontSize(14);
      pdf.text(trait.trait, 20, yOffset);
      yOffset += 7;

      pdf.setFontSize(12);
      pdf.text(`Score: ${trait.score}%`, 30, yOffset);
      yOffset += 7;

      const descLines = pdf.splitTextToSize(trait.description, 160);
      descLines.forEach(line => {
        pdf.text(line, 30, yOffset);
        yOffset += 7;
      });

      trait.recommendations.forEach(rec => {
        pdf.text(`• ${rec}`, 35, yOffset);
        yOffset += 7;
      });

      yOffset += 5;
    });

    // Add skills assessment
    if (yOffset > 250) {
      pdf.addPage();
      yOffset = 20;
    }

    pdf.setFontSize(16);
    pdf.text('Skills Assessment', 20, yOffset);
    yOffset += 10;

    const skills = [
      result.skills.technical,
      result.skills.analytical,
      ...result.skills.soft
    ];

    skills.forEach(skill => {
      if (yOffset > 250) {
        pdf.addPage();
        yOffset = 20;
      }

      pdf.setFontSize(14);
      pdf.text(skill.trait, 20, yOffset);
      yOffset += 7;

      pdf.setFontSize(12);
      pdf.text(`Score: ${skill.score}%`, 30, yOffset);
      yOffset += 7;

      const descLines = pdf.splitTextToSize(skill.description, 160);
      descLines.forEach(line => {
        pdf.text(line, 30, yOffset);
        yOffset += 7;
      });

      yOffset += 5;
    });

    // Add recommendations
    if (yOffset > 250) {
      pdf.addPage();
      yOffset = 20;
    }

    pdf.setFontSize(16);
    pdf.text('Overall Recommendations', 20, yOffset);
    yOffset += 10;

    result.overallRecommendations.forEach(rec => {
      if (yOffset > 280) {
        pdf.addPage();
        yOffset = 20;
      }

      const lines = pdf.splitTextToSize(`• ${rec}`, 170);
      lines.forEach(line => {
        pdf.setFontSize(12);
        pdf.text(line, 20, yOffset);
        yOffset += 7;
      });
    });

    // Save the PDF
    pdf.save('Career-Assessment-Results.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export async function generateCareerVisionPDF(results: any): Promise<void> {
  try {
    const pdf = new jsPDF();
    let yOffset = 20;

    // Add header
    pdf.setFontSize(24);
    pdf.setTextColor(100, 50, 200);
    pdf.text('Career Vision Assessment Results', 20, yOffset);
    yOffset += 20;

    // Add overall scores
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Overall Scores', 20, yOffset);
    yOffset += 10;

    const categories = [
      { title: 'Self-Discovery', score: results.selfDiscovery.score },
      { title: 'Skills Analysis', score: results.skillsAnalysis.score },
      { title: 'Career Alignment', score: results.careerAlignment.score },
      { title: 'Future Planning', score: results.futurePlanning.score }
    ];

    categories.forEach(category => {
      pdf.setFontSize(12);
      pdf.text(`${category.title}: ${category.score}%`, 30, yOffset);
      yOffset += 10;
    });

    // Add detailed sections
    yOffset += 10;
    pdf.setFontSize(16);
    pdf.text('Detailed Analysis', 20, yOffset);
    yOffset += 10;

    // Technical Skills
    pdf.setFontSize(14);
    pdf.text('Technical Skills', 20, yOffset);
    yOffset += 10;
    pdf.setFontSize(12);
    pdf.text(`Score: ${results.skillsAnalysis.technical.score}%`, 30, yOffset);
    yOffset += 7;
    pdf.text(results.skillsAnalysis.technical.description, 30, yOffset);
    yOffset += 15;

    // Analytical Skills
    pdf.setFontSize(14);
    pdf.text('Analytical Skills', 20, yOffset);
    yOffset += 10;
    pdf.setFontSize(12);
    pdf.text(`Score: ${results.skillsAnalysis.analytical.score}%`, 30, yOffset);
    yOffset += 7;
    pdf.text(results.skillsAnalysis.analytical.description, 30, yOffset);
    yOffset += 15;

    // Add recommendations
    if (yOffset > 250) {
      pdf.addPage();
      yOffset = 20;
    }

    pdf.setFontSize(16);
    pdf.text('Recommendations', 20, yOffset);
    yOffset += 10;

    results.recommendations.forEach((rec: string) => {
      if (yOffset > 280) {
        pdf.addPage();
        yOffset = 20;
      }
      pdf.setFontSize(12);
      const lines = pdf.splitTextToSize(rec, 170);
      lines.forEach((line: string) => {
        pdf.text('• ' + line, 30, yOffset);
        yOffset += 7;
      });
    });

    // Save the PDF
    pdf.save('Career-Vision-Results.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
#!/usr/bin/env python3
"""Generate Handout PDF for Kinderrechte Referat"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

W, H = A4
OUTPUT = "handout-kinderrechte.pdf"

# Colors
DARK = HexColor("#1a1a2e")
BLUE = HexColor("#1565C0")
GRAY = HexColor("#555555")
LIGHT_GRAY = HexColor("#E0E0E0")
ORANGE = HexColor("#E65100")
GREEN = HexColor("#2E7D32")
RED = HexColor("#C62828")
PURPLE = HexColor("#6A1B9A")

styles = getSampleStyleSheet()

# Custom styles
styles.add(ParagraphStyle(
    'DocTitle', fontName='Helvetica-Bold', fontSize=14,
    leading=18, alignment=TA_CENTER, spaceAfter=2,
    textColor=DARK
))
styles.add(ParagraphStyle(
    'DocSubtitle', fontName='Helvetica', fontSize=9,
    leading=12, alignment=TA_CENTER, spaceAfter=4,
    textColor=GRAY
))
styles.add(ParagraphStyle(
    'SectionHead', fontName='Helvetica-Bold', fontSize=11,
    leading=14, spaceBefore=12, spaceAfter=4,
    textColor=DARK, borderPadding=(0, 0, 2, 0)
))
styles.add(ParagraphStyle(
    'SubHead', fontName='Helvetica-Bold', fontSize=9.5,
    leading=12, spaceBefore=6, spaceAfter=2,
    textColor=BLUE
))
styles.add(ParagraphStyle(
    'BodyText2', fontName='Helvetica', fontSize=8.5,
    leading=12, alignment=TA_JUSTIFY, spaceAfter=2,
    textColor=black
))
styles.add(ParagraphStyle(
    'BulletItem', fontName='Helvetica', fontSize=8.5,
    leading=11, leftIndent=12, spaceAfter=1,
    bulletIndent=0, textColor=black
))
styles.add(ParagraphStyle(
    'SmallNote', fontName='Helvetica-Oblique', fontSize=7.5,
    leading=10, textColor=GRAY, spaceAfter=2
))
styles.add(ParagraphStyle(
    'TableCell', fontName='Helvetica', fontSize=8,
    leading=10, textColor=black
))
styles.add(ParagraphStyle(
    'TableHead', fontName='Helvetica-Bold', fontSize=8,
    leading=10, textColor=DARK
))
styles.add(ParagraphStyle(
    'Footer', fontName='Helvetica', fontSize=7,
    leading=9, alignment=TA_CENTER, textColor=GRAY
))

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=LIGHT_GRAY, spaceAfter=4, spaceBefore=4)

def section(title):
    return Paragraph(title, styles['SectionHead'])

def sub(title):
    return Paragraph(title, styles['SubHead'])

def body(text):
    return Paragraph(text, styles['BodyText2'])

def bullet(text):
    return Paragraph(f"\u2022  {text}", styles['BulletItem'])

def note(text):
    return Paragraph(text, styles['SmallNote'])

def build():
    doc = SimpleDocTemplate(
        OUTPUT, pagesize=A4,
        leftMargin=2*cm, rightMargin=2*cm,
        topMargin=1.8*cm, bottomMargin=1.5*cm
    )

    story = []

    # === HEADER ===
    header_data = [
        [Paragraph('<b>Lydia Howe &amp; Alexandre Zua Caldeira</b>', styles['TableCell']),
         Paragraph('<b>Fach:</b> Recht', styles['TableCell']),
         Paragraph('<b>Lehrer:</b> Uwe Otto', styles['TableCell']),
         Paragraph('<b>Datum:</b> 06.03.2026', styles['TableCell'])],
    ]
    header_table = Table(header_data, colWidths=[5.5*cm, 3.5*cm, 3.5*cm, 4*cm])
    header_table.setStyle(TableStyle([
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, LIGHT_GRAY),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))

    # === TITLE ===
    story.append(Paragraph('Die Kernrechte der UN-Kinderrechtskonvention', styles['DocTitle']))
    story.append(Paragraph('Handout zum Referat', styles['DocSubtitle']))
    story.append(hr())

    # === GLIEDERUNG ===
    story.append(section('Gliederung'))
    gliederung = [
        ('1.', 'Geschichte und Kontext der UN-Kinderrechtskonvention (KRK)', 'Lydia'),
        ('2.', 'Überblick, Kategorien & Schlüsselartikel', 'Zua'),
        ('3.', 'Verletzungen weltweit', 'Zua'),
        ('4.', 'Vermittlung & Schutz in Deutschland', 'Zua'),
        ('5.', 'Kritische Perspektiven', 'Lydia'),
        ('6.', 'Diskussion', 'Alle'),
    ]
    gl_data = [[Paragraph(f'<b>{n}</b>', styles['TableCell']),
                Paragraph(t, styles['TableCell']),
                Paragraph(f'<i>{s}</i>', styles['TableCell'])] for n, t, s in gliederung]
    gl_table = Table(gl_data, colWidths=[0.8*cm, 12*cm, 2.5*cm])
    gl_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
    ]))
    story.append(gl_table)
    story.append(hr())

    # === 1. GESCHICHTE ===
    story.append(section('1. Geschichte und Kontext der UN-KRK'))
    story.append(body(
        'Die UN-Kinderrechtskonvention (KRK) markiert einen bedeutenden Wendepunkt: '
        'Kinder werden als autonome Wesen und als eigenständige soziale Gruppe mit eigenen Rechten anerkannt. '
        'Die Konvention ist ein Produkt des historischen, kulturellen und politischen Kontextes '
        'und ein Musterbeispiel für den Wandel im Verständnis von Kindheit.'
    ))
    story.append(Spacer(1, 4))

    story.append(sub('Wichtige Meilensteine'))
    timeline_data = [
        [Paragraph('<b>Jahr</b>', styles['TableHead']),
         Paragraph('<b>Ereignis</b>', styles['TableHead']),
         Paragraph('<b>Bedeutung</b>', styles['TableHead'])],
        [Paragraph('1870', styles['TableCell']), Paragraph('Education Act (UK)', styles['TableCell']), Paragraph('Bildung für alle Kinder', styles['TableCell'])],
        [Paragraph('1924', styles['TableCell']), Paragraph('Genfer Erklärung', styles['TableCell']), Paragraph('Erstes internationales Dokument', styles['TableCell'])],
        [Paragraph('1948', styles['TableCell']), Paragraph('Menschenrechtserklärung', styles['TableCell']), Paragraph('Besonderer Schutz für Kinder', styles['TableCell'])],
        [Paragraph('1959', styles['TableCell']), Paragraph('Erklärung der Rechte des Kindes', styles['TableCell']), Paragraph('10 Grundsätze, nicht bindend', styles['TableCell'])],
        [Paragraph('<b>1989</b>', styles['TableHead']), Paragraph('<b>UN-Kinderrechtskonvention</b>', styles['TableHead']), Paragraph('<b>54 Artikel, 196 Staaten</b>', styles['TableHead'])],
        [Paragraph('1990', styles['TableCell']), Paragraph('KRK tritt in Kraft', styles['TableCell']), Paragraph('Schnellste Ratifikation der Geschichte', styles['TableCell'])],
        [Paragraph('1992', styles['TableCell']), Paragraph('Ratifizierung in Deutschland', styles['TableCell']), Paragraph('KRK wird deutsches Recht', styles['TableCell'])],
        [Paragraph('2000', styles['TableCell']), Paragraph('Zusatzprotokolle', styles['TableCell']), Paragraph('Kinderhandel & Kindersoldaten', styles['TableCell'])],
        [Paragraph('2011', styles['TableCell']), Paragraph('3. Zusatzprotokoll', styles['TableCell']), Paragraph('Individuelles Beschwerderecht', styles['TableCell'])],
    ]
    tl_table = Table(timeline_data, colWidths=[1.5*cm, 5.5*cm, 9.5*cm])
    tl_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, DARK),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#FFFFFF'), HexColor('#F5F5F5')]),
        ('BACKGROUND', (0, 5), (-1, 5), HexColor('#E3F2FD')),
    ]))
    story.append(tl_table)
    story.append(hr())

    # === 2. GRUNDPRINZIPIEN & ARTIKEL ===
    story.append(section('2. Die vier Grundprinzipien der UN-KRK'))
    story.append(body('Alle 54 Artikel lassen sich in vier Kategorien einordnen:'))
    story.append(Spacer(1, 4))

    cat_data = [
        [Paragraph('<b>Kategorie</b>', styles['TableHead']),
         Paragraph('<b>Inhalt</b>', styles['TableHead']),
         Paragraph('<b>Schlüsselartikel</b>', styles['TableHead'])],
        [Paragraph('<b>Überleben</b>', styles['TableCell']),
         Paragraph('Leben, Gesundheit, Ernährung', styles['TableCell']),
         Paragraph('Art. 6 (Recht auf Leben), Art. 24 (Gesundheit), Art. 27 (Lebensstandard)', styles['TableCell'])],
        [Paragraph('<b>Entwicklung</b>', styles['TableCell']),
         Paragraph('Bildung, Spiel, Freizeit', styles['TableCell']),
         Paragraph('Art. 28 (Bildung), Art. 29 (Bildungsziele), Art. 31 (Spiel & Freizeit)', styles['TableCell'])],
        [Paragraph('<b>Schutz</b>', styles['TableCell']),
         Paragraph('Vor Gewalt, Missbrauch, Ausbeutung', styles['TableCell']),
         Paragraph('Art. 19 (Gewaltschutz), Art. 32 (Kinderarbeit), Art. 34 (sex. Ausbeutung)', styles['TableCell'])],
        [Paragraph('<b>Beteiligung</b>', styles['TableCell']),
         Paragraph('Meinungsäußerung, Mitbestimmung', styles['TableCell']),
         Paragraph('Art. 12 (Meinung des Kindes), Art. 13 (Meinungsfreiheit), Art. 15 (Vereinigung)', styles['TableCell'])],
    ]
    cat_table = Table(cat_data, colWidths=[2.8*cm, 4.5*cm, 9.2*cm])
    cat_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, DARK),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#FFFFFF'), HexColor('#F5F5F5')]),
        ('GRID', (0, 0), (-1, -1), 0.25, LIGHT_GRAY),
    ]))
    story.append(cat_table)
    story.append(hr())

    # === 3. VERLETZUNGEN ===
    story.append(section('3. Verletzungen weltweit — Zentrale Zahlen'))

    stats_data = [
        [Paragraph('<b>Zahl</b>', styles['TableHead']),
         Paragraph('<b>Bedeutung</b>', styles['TableHead']),
         Paragraph('<b>Quelle</b>', styles['TableHead'])],
        [Paragraph('<b>473 Mio.</b>', styles['TableCell']),
         Paragraph('Kinder leben in Konfliktgebieten (jedes 6. Kind weltweit)', styles['TableCell']),
         Paragraph('UNICEF 2024', styles['TableCell'])],
        [Paragraph('<b>138 Mio.</b>', styles['TableCell']),
         Paragraph('Kinder in Kinderarbeit — UN-Ziel 2025 verfehlt', styles['TableCell']),
         Paragraph('ILO/UNICEF 2024', styles['TableCell'])],
        [Paragraph('<b>417 Mio.</b>', styles['TableCell']),
         Paragraph('Kinder in extremer Armut', styles['TableCell']),
         Paragraph('Weltbank 2024', styles['TableCell'])],
        [Paragraph('<b>52 Mio.</b>', styles['TableCell']),
         Paragraph('Kinder ohne Schulzugang', styles['TableCell']),
         Paragraph('UNESCO 2024', styles['TableCell'])],
        [Paragraph('<b>196</b>', styles['TableCell']),
         Paragraph('Staaten haben die KRK ratifiziert (nur die USA fehlen)', styles['TableCell']),
         Paragraph('UN Treaty Collection', styles['TableCell'])],
    ]
    stats_table = Table(stats_data, colWidths=[2.5*cm, 10*cm, 4*cm])
    stats_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, DARK),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#FFFFFF'), HexColor('#F5F5F5')]),
    ]))
    story.append(stats_table)
    story.append(Spacer(1, 4))

    story.append(sub('Fortschritte'))
    story.append(bullet('Kindersterblichkeit: von 33 % auf 4 % gesunken'))
    story.append(bullet('Mangelernährung: von 40 % auf 22 % gesunken'))
    story.append(bullet('196 Staaten haben die KRK ratifiziert'))
    story.append(hr())

    # === 4. VERMITTLUNG & SCHUTZ ===
    story.append(section('4. Vermittlung & Schutz in Deutschland'))

    story.append(sub('Altersgerechte Vermittlung'))
    story.append(bullet('Kindergarten (3–6): Bilderbücher, Rollenspiele, Fairness'))
    story.append(bullet('Grundschule (6–10): Projekttage, Klassenräte, Poster'))
    story.append(bullet('Sekundarstufe (10–18): Planspiele, Debatten, Fallstudien'))
    story.append(Spacer(1, 4))

    story.append(sub('Rechtlicher Schutz in Deutschland'))
    story.append(bullet('<b>1949</b> — Grundgesetz Art. 6: Familie unter staatlichem Schutz'))
    story.append(bullet('<b>2000</b> — Gewaltfreie Erziehung: § 1631 Abs. 2 BGB'))
    story.append(bullet('<b>2012</b> — Beschwerderecht: § 45 SGB VIII wird Pflicht'))
    story.append(bullet('<b>2021</b> — Gewaltschutzkonzept: Pflicht für alle Einrichtungen'))
    story.append(Spacer(1, 2))
    story.append(note('Schlüsselnorm: § 45 Abs. 2 Nr. 3 SGB VIII — Betriebserlaubnis nur mit Gewaltschutzkonzept und Beschwerdemanagement.'))
    story.append(hr())

    # === 5. KRITISCHE PERSPEKTIVEN ===
    story.append(section('5. Kritische Perspektiven'))

    story.append(body(
        '„Die UN-Kinderrechtskonvention universalisiert westliche Konzepte von Kindheit." (Imoah, 2012)'
    ))
    story.append(Spacer(1, 4))

    story.append(sub('Anthropologische Kritik'))
    story.append(bullet('„Liberaler, westlicher Bias" (Quennerstedt 2018)'))
    story.append(bullet('Kindheit ist kulturell geprägt, nicht universell (Goodall 2015)'))
    story.append(bullet('AAA kritisierte 1947: „cultural imperialism" (Billaud 2022)'))
    story.append(bullet('Art. 3 „Kindeswohl" — der zentrale Begriff wurde nie definiert'))
    story.append(Spacer(1, 4))

    story.append(sub('6 Faktoren der Kindheit (Goodall 2015)'))
    story.append(body('Was als „normale Kindheit" gilt, variiert weltweit nach: Kultur, Gender, Patriarchat, Religion, Aspirationen, Ökonomie.'))
    story.append(Spacer(1, 4))

    story.append(sub('Fallstudien'))
    case_data = [
        [Paragraph('<b>Südafrika</b> (Levine 2011)', styles['TableHead']),
         Paragraph('<b>Malawi</b> (Englund / Billaud)', styles['TableHead'])],
        [Paragraph('Kinderarbeitsgesetze eingeführt\nSaisonarbeit nicht mehr möglich\nArmut der Kinder stieg', styles['TableCell']),
         Paragraph('Menschenrechtsdiskurs kam\n„Freiheit" ignorierte Armut\nOberschicht profitierte', styles['TableCell'])],
    ]
    case_table = Table(case_data, colWidths=[8.25*cm, 8.25*cm])
    case_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, DARK),
        ('GRID', (0, 0), (-1, -1), 0.25, LIGHT_GRAY),
    ]))
    story.append(case_table)
    story.append(hr())

    # === 6. DISKUSSIONSFRAGEN ===
    story.append(section('6. Diskussionsfragen'))
    questions = [
        'Sollten Kinderrechte explizit im Grundgesetz stehen?',
        'Wie können Kinder in der Schule stärker mitbestimmen?',
        'Brauchen wir neue Kinderrechte für die digitale Welt?',
        'Welche Kinderrechte werden in Deutschland am häufigsten übersehen?',
        'Was kann jeder Einzelne für Kinderrechte tun?',
    ]
    for i, q in enumerate(questions, 1):
        story.append(Paragraph(f'<b>{i}.</b>  {q}', styles['BulletItem']))
    story.append(Spacer(1, 8))

    # === QUELLEN ===
    story.append(hr())
    story.append(note(
        '<b>Quellen:</b> UN-Kinderrechtskonvention (1989) · UNICEF State of the World\'s Children 2024 · '
        'ILO/UNICEF Child Labour Report 2024 · Imoah (2012) · Goodall (2015) · Quennerstedt (2018) · '
        'Billaud (2022) · Levine (2011) · Englund: Prisoners of Freedom · '
        '§ 45, § 8a SGB VIII · § 1631 Abs. 2 BGB · Grundgesetz Art. 6'
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'Website: <b>kinderrechte.zuacaldeira.com</b>',
        styles['Footer']
    ))

    doc.build(story)
    print(f"Handout generated: {OUTPUT}")

if __name__ == '__main__':
    build()

import os
import pymupdf

source = os.path.abspath("Afroj Resume.pdf")
temporary = os.path.abspath("Afroj Resume.updated.pdf")

doc = pymupdf.open(source)
page = doc[0]

# Remove only the outdated summary, role and experience/skills text regions.
white = (1, 1, 1)
page.add_redact_annot(pymupdf.Rect(39.5, 114.0, 572.5, 147.5), fill=white)
page.add_redact_annot(pymupdf.Rect(39.5, 186.5, 130.0, 199.0), fill=white)
page.add_redact_annot(pymupdf.Rect(38.5, 210.5, 570.0, 235.0), fill=white)
page.add_redact_annot(pymupdf.Rect(39.5, 694.5, 568.0, 740.5), fill=white)
page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)

# Updated professional summary.
summary = (
    "Data Engineer at Deloitte USI with hands-on experience in enterprise analytics, "
    "Oracle Fusion Data Intelligence and financial reporting. Skilled in Oracle SQL, "
    "Python, Snowflake, data modelling, validation and Oracle Analytics Cloud. Experienced "
    "in ERP, GL, AP, AR and EPM reporting, OTBI, data integration and UAT-to-production deployment support."
)
page.insert_textbox(pymupdf.Rect(39.7, 114.7, 567.0, 147.0), summary,
                    fontname="helv", fontsize=8.1, lineheight=1.18,
                    color=(0.12, 0.12, 0.12), align=pymupdf.TEXT_ALIGN_LEFT)

# Updated role title.
page.insert_textbox(pymupdf.Rect(39.7, 185.8, 145.0, 198.9), "Data Engineer",
                    fontname="hebo", fontsize=9.2,
                    color=(0.08, 0.22, 0.43), align=pymupdf.TEXT_ALIGN_LEFT)

# Updated, role-relevant responsibilities.
experience = (
    "• Developing and enhancing Oracle Fusion Data Intelligence solutions across ERP/HCM subject areas, custom models and business metrics.\n"
    "• Building OAC and OTBI reports and dashboards for GL, AP, AR and EPM; validating data across Snowflake and enterprise reporting platforms."
)
page.insert_textbox(pymupdf.Rect(39.7, 210.5, 568.0, 235.0), experience,
                    fontname="helv", fontsize=7.35, lineheight=1.18,
                    color=(0.12, 0.12, 0.12), align=pymupdf.TEXT_ALIGN_LEFT)

# Updated skills section while retaining the original two-column/compact layout style.
skills = (
    "Programming Languages : Python, Oracle SQL, MySQL, JavaScript\n"
    "Data & Analytics : Oracle FDI, OAC, OTBI, ERP, GL, AP, AR, EPM, Snowflake, ODI, Data Warehousing\n"
)
page.insert_textbox(pymupdf.Rect(39.7, 694.8, 568.0, 716.5), skills,
                    fontname="helv", fontsize=7.15, lineheight=1.18,
                    color=(0.12, 0.12, 0.12), align=pymupdf.TEXT_ALIGN_LEFT)

# Preserve the existing compact Other Tools / Soft Skills lines, replacing only the old block's second section with latest tooling context.
other_tools = (
    "Other Tools : Microsoft Excel, Microsoft PowerPoint, Microsoft Word, VS Code, Git & GitHub\n"
    "Soft Skills : Problem-Solving, Analytical Thinking, Adaptability, Collaboration, Communication, Time Management"
)
page.insert_textbox(pymupdf.Rect(39.7, 718.0, 568.0, 739.8), other_tools,
                    fontname="helv", fontsize=7.15, lineheight=1.18,
                    color=(0.12, 0.12, 0.12), align=pymupdf.TEXT_ALIGN_LEFT)

# Add subtle PDF highlights to the most important current role and technology areas.
highlight_terms = [
    "Data Engineer",
    "Oracle Fusion Data Intelligence",
    "Oracle Analytics Cloud",
    "OTBI",
    "Snowflake",
    "UAT-to-production",
]
for term in highlight_terms:
    for rect in page.search_for(term):
        page.add_highlight_annot(rect)

metadata = doc.metadata or {}
metadata["title"] = "Afroj Khan - Data Engineer Resume"
metadata["subject"] = "Data Engineering, Oracle Analytics and Enterprise Reporting Resume"
metadata["author"] = "Afroj Khan"
doc.set_metadata(metadata)

doc.save(temporary, garbage=4, deflate=True)
doc.close()

os.replace(temporary, source)
print(source)

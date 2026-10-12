'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Check, FileUp, LockKeyhole } from 'lucide-react'
import { SubpageShell } from '@/components/subpage-shell'

type Field = {
  label: string
  type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'textarea' | 'file'
  multiple?: boolean
}

type FormSection = {
  title: string
  description: string
  fields: Field[]
}

const applicationForms = {
  franchise: {
    title: 'Franchise Registration',
    subtitle: 'Join IQ Energies and become part of the renewable energy revolution.',
    heroImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1800&q=90',
    trust: ['100% Secure', 'Verified by IQ Energies', 'Pan India Presence'],
    sections: [
      { title: 'Personal Information', description: 'How can our franchise team reach you?', fields: [{ label: 'First Name' }, { label: 'Last Name' }, { label: 'Email Address', type: 'email' }, { label: 'Phone Number', type: 'tel' }, { label: 'Alternate Phone Number', type: 'tel' }] },
      { title: 'Business Details', description: 'Tell us about your current or planned business.', fields: [{ label: 'Business Name' }, { label: 'Business Type' }, { label: 'Business Address', type: 'textarea' }, { label: 'City' }, { label: 'State' }, { label: 'Pincode' }] },
      { title: 'Franchise Information', description: 'Share the opportunity you have in mind.', fields: [{ label: 'Investment Range' }, { label: 'Years of Experience', type: 'number' }, { label: 'Number of Employees', type: 'number' }, { label: 'Do you currently own a business?' }, { label: 'Interested Locations' }, { label: 'Preferred Timeline' }] },
      { title: 'Additional Information', description: 'Anything else you would like our team to know?', fields: [{ label: 'How did you hear about us?' }, { label: 'Additional Notes', type: 'textarea' }] },
    ] satisfies FormSection[],
    privacy: false,
  },
  vendor: {
    title: 'Vendor Registration',
    subtitle: 'Partner with IQ Energies and be part of the renewable energy ecosystem.',
    heroImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1800&q=90',
    trust: ['Secure & Confidential', 'Verified Partnership', 'Pan India Network'],
    sections: [
      { title: 'Company Information', description: 'Provide the details of your organization.', fields: [{ label: 'Company Name' }, { label: 'Company Type' }, { label: 'Registration Number' }, { label: 'GST Number' }, { label: 'PAN Number' }, { label: 'Email Address', type: 'email' }, { label: 'Phone Number', type: 'tel' }, { label: 'Website', type: 'url' }, { label: 'Year Established', type: 'number' }, { label: 'Number of Employees', type: 'number' }, { label: 'Annual Turnover' }] },
      { title: 'Contact Details', description: 'Who should we contact about your application?', fields: [{ label: 'Contact Person' }, { label: 'Designation' }, { label: 'Business Address', type: 'textarea' }, { label: 'City' }, { label: 'State' }, { label: 'Pincode' }, { label: 'Alternate Phone Number', type: 'tel' }] },
      { title: 'Vendor Details', description: 'Help us understand your products, services and experience.', fields: [{ label: 'Vendor Category' }, { label: 'Years of Experience', type: 'number' }, { label: 'Products/Services Offered', type: 'textarea' }, { label: 'Certifications & Accreditations', type: 'textarea' }, { label: 'Previous Clients / Projects', type: 'textarea' }, { label: 'References', type: 'textarea' }, { label: 'Upload Supporting Documents', type: 'file', multiple: true }] },
      { title: 'Additional Information', description: 'Add any further context for the vendor team.', fields: [{ label: 'How did you hear about us?' }, { label: 'Additional Notes', type: 'textarea' }] },
    ] satisfies FormSection[],
    privacy: true,
  },
  career: {
    title: 'Career Application',
    subtitle: 'Join IQ Energies and be part of the renewable energy revolution.',
    heroImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1800&q=90',
    trust: ['100% Secure & Confidential', 'Equal Opportunity Employer', 'Global Opportunities'],
    sections: [
      { title: 'Personal Information', description: 'Share your contact details.', fields: [{ label: 'First Name' }, { label: 'Last Name' }, { label: 'Email Address', type: 'email' }, { label: 'Phone Number', type: 'tel' }, { label: 'Current Address', type: 'textarea' }, { label: 'City' }, { label: 'State' }, { label: 'Pincode' }] },
      { title: 'Job Details', description: 'Tell us about the role you are interested in.', fields: [{ label: 'Position Applied For' }, { label: 'Department' }, { label: 'Years of Experience', type: 'number' }, { label: 'Current Salary' }, { label: 'Expected Salary' }, { label: 'Notice Period' }] },
      { title: 'Professional Information', description: 'Help us understand your background and work.', fields: [{ label: 'Education Level' }, { label: 'Skills', type: 'textarea' }, { label: 'Certifications', type: 'textarea' }, { label: 'LinkedIn Profile', type: 'url' }, { label: 'GitHub Profile', type: 'url' }, { label: 'Portfolio Website', type: 'url' }] },
      { title: 'Upload Documents', description: 'Attach your application documents.', fields: [{ label: 'Resume/CV', type: 'file' }, { label: 'Cover Letter', type: 'file' }] },
      { title: 'Additional Information', description: 'Share any additional context with the hiring team.', fields: [{ label: 'How did you hear about this opportunity?' }, { label: 'Additional Notes', type: 'textarea' }] },
    ] satisfies FormSection[],
    privacy: true,
  },
} satisfies Record<string, {
  title: string
  subtitle: string
  heroImage: string
  trust: string[]
  sections: FormSection[]
  privacy: boolean
}>

export function ApplicationForm({ kind }: { kind: keyof typeof applicationForms }) {
  const form = applicationForms[kind]
  const [fileNames, setFileNames] = useState<Record<string, string[]>>({})
  const [submissionReady, setSubmissionReady] = useState(false)

  const updateFiles = (fieldName: string, files: FileList | null) => {
    setFileNames((current) => ({ ...current, [fieldName]: files ? Array.from(files, (file) => file.name) : [] }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = Array.from(new FormData(event.currentTarget), ([label, value]) => {
      const displayValue = value instanceof File ? value.name : value
      return `${label}: ${displayValue || '—'}`
    })
    const subject = `${form.title} — IQ Energies`
    const body = [
      `Application type: ${form.title}`,
      '',
      ...values,
      '',
      'Please attach the selected files to this email before sending.',
    ].join('\n')
    window.location.href = `mailto:sales@iqenergies.co.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmissionReady(true)
  }

  return (
    <SubpageShell eyebrow="Join our network" title={form.title} description={form.subtitle} heroImage={form.heroImage}>
      <div className="application-layout">
        <aside className="application-aside">
          <p className="eyebrow">Your next step</p>
          <h2>Build the future with IQ Energies.</h2>
          <p>Complete the sections below. Your email application will be prepared with your answers for review before sending.</p>
          <nav aria-label="Application sections">
            {form.sections.map((section, index) => (
              <a key={section.title} href={`#application-section-${index + 1}`}><span>0{index + 1}</span>{section.title}</a>
            ))}
          </nav>
          <div className="application-trust">
            {form.trust.map((item) => <span key={item}><Check aria-hidden="true" />{item}</span>)}
          </div>
        </aside>

        <form className="application-form" onSubmit={handleSubmit}>
          {form.sections.map((section, sectionIndex) => (
            <section className="application-form__section" id={`application-section-${sectionIndex + 1}`} key={section.title}>
              <div className="application-form__heading">
                <span>0{sectionIndex + 1}</span>
                <div><h2>{section.title}</h2><p>{section.description}</p></div>
              </div>
              <div className="application-form__fields">
                {section.fields.map((field) => {
                  const name = `${section.title} — ${field.label}`
                  if (field.type === 'file') {
                    return (
                      <label className="application-upload" key={name} onDragOver={(event) => event.preventDefault()} onDrop={(event) => {
                        event.preventDefault()
                        const input = event.currentTarget.querySelector('input[type=file]')
                        if (input instanceof HTMLInputElement) {
                          input.files = event.dataTransfer.files
                          updateFiles(name, input.files)
                        }
                      }}>
                        <input type="file" name={name} multiple={'multiple' in field ? field.multiple : false} onChange={(event) => updateFiles(name, event.currentTarget.files)} />
                        <FileUp aria-hidden="true" />
                        <span>{field.label}</span>
                        <small>Drag and drop files here, or browse to choose</small>
                        {fileNames[name]?.length ? <small className="application-upload__files">{fileNames[name].join(', ')}</small> : null}
                      </label>
                    )
                  }
                  if (field.type === 'textarea') {
                    return <span className="application-field application-field--wide" key={name}><label htmlFor={name}>{field.label}</label><textarea id={name} name={name} rows={3} /></span>
                  }
                  return <span className="application-field" key={name}><label htmlFor={name}>{field.label}</label><input id={name} name={name} type={field.type ?? 'text'} /></span>
                })}
              </div>
            </section>
          ))}

          <div className="application-consent">
            <label><input type="checkbox" name="Terms and Conditions" required />I agree to the Terms and Conditions.</label>
            {form.privacy ? <label><input type="checkbox" name="Privacy Policy" required />I agree to the Privacy Policy.</label> : null}
          </div>
          <button className="button button-green" type="submit">Submit Application <ArrowRight /></button>
          {submissionReady ? <p className="application-status" role="status"><LockKeyhole aria-hidden="true" /> Your email application is ready. Review and send it in your email app, and attach any selected documents.</p> : null}
        </form>
      </div>
    </SubpageShell>
  )
}

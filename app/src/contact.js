import React from 'react';

export const Contact = () => {
    return (
			<div class="flex flex-row justify-center p-4 ">
				<div className="p-4 w-full lg:w-1/2">
					<h1 className="text-3xl font-heading text-letter uppercase mb-4">GET IN TOUCH</h1>	
					<p className="mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					<ContactForm />
				</div>
			</div>
		)
}


function ContactForm(props){
	return (
		<div className="w-full bg-panel p-4 flex flex-row flex-wrap gap-y-8">
			<h3 className="w-full font-heading text-2xl">Contact Form</h3>
			<div className="w-full md:w-1/2 md:pr-10">
				<label className="font-heading block mb-4">Name <span className="text-accent">*</span></label>
				<input className="input mr-10" type="text" />
			</div>
			<div className="w-full md:w-1/2">
				<label className="font-heading block mb-4">Email Address <span className="text-accent">*</span></label>
				<input className="input" type="text" />
			</div>
			<div className="w-full">
				<label className="font-heading block mb-4">Message <span className="text-accent">*</span></label>
				<textarea className="input" rows="6" />
			</div>
			<div  className="w-full flex justify-end">
				<input className="w-full md:w-auto btn-color text-white px-4 py-2" type="submit" value="Send" />
			</div>
		</div>
	)
}

export default Contact;
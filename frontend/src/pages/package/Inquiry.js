import React from 'react'

const Inquiry = () => {
    return (
        <div class="package-booking p-4">
            <h3>Make an Inquiry</h3>
            <form action="" method="post">
                <label for="inquiry-type">Inquiry Type</label>
                <select id="inquiry-type" name="inquiry-type">
                    <option value="general">Destination</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                </select>

                <label for="email">Inquiry Title</label>
                <input type="email" id="email" name="email" />

                <label for="phone">Inquiry Description</label>
                <input type="tel" id="phone" name="phone" />


                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Inquiry

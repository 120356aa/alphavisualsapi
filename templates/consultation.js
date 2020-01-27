const Consultation = data => {
    return (
        `
        Name: ${data.name},
        Email: ${data.email},
        Phone: ${data.phone},
        Preferred Time: ${data.time},
        Photographer: ${data.photographer},
        Shoot: ${data.shoot},
        Message: ${data.comment},
        DJ: ${data.dj},
        Video: ${data.video}
        `
    )
}

module.exports = { Consultation };
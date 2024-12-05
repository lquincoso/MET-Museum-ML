//
//  GalleryAnnotation.swift
//  MuseumApp
//
//  Created by Ito on 11/30/24.
//

import MapKit

class GalleryAnnotation: NSObject, MKAnnotation {
    let id: String
    let coordinate: CLLocationCoordinate2D
    let markerType: MarkerType
    var title: String?
    var subtitle: String?
    
    init(id: String, coordinate: CLLocationCoordinate2D, markerType: MarkerType, title: String? = nil, subtitle: String? = nil) {
        self.id = id
        self.coordinate = coordinate
        self.markerType = markerType
        self.title = title
        self.subtitle = subtitle
        super.init()
    }
}

enum MarkerType {
    case regular
    case start
    case waypoint
    case end
}


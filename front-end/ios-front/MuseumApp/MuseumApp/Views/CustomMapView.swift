//
//  CustomMapView.swift
//  MuseumApp
//
//  Created by Ito on 11/30/24.
//

import SwiftUI
import MapKit

struct CustomMapView: UIViewRepresentable {
    let pathCoordinates: [CLLocationCoordinate2D]
    let annotations: [GalleryAnnotation]
    
    private let museumCenter = CLLocationCoordinate2D(
        latitude: 40.7794,
        longitude: -73.9632
    )
    
    func makeUIView(context: Context) -> MKMapView {
        let mapView = MKMapView()
        mapView.delegate = context.coordinator
        
        let region = MKCoordinateRegion(
            center: museumCenter,
            span: MKCoordinateSpan(latitudeDelta: 0.001, longitudeDelta: 0.001)
        )
        mapView.setRegion(region, animated: false)
        
        return mapView
    }
    
    func updateUIView(_ mapView: MKMapView, context: Context) {
        mapView.removeOverlays(mapView.overlays)
        mapView.removeAnnotations(mapView.annotations)
        
        mapView.addAnnotations(annotations)
        
        if pathCoordinates.count >= 2 {
            let polyline = MKPolyline(coordinates: pathCoordinates, count: pathCoordinates.count)
            mapView.addOverlay(polyline)
            
            let rect = polyline.boundingMapRect
            mapView.setVisibleMapRect(
                rect.insetBy(dx: -rect.width * 0.2, dy: -rect.height * 0.2),
                animated: true
            )
        }
    }
   
   func makeCoordinator() -> Coordinator {
       Coordinator(self)
   }
   
   class Coordinator: NSObject, MKMapViewDelegate {
       var parent: CustomMapView
       
       init(_ parent: CustomMapView) {
           self.parent = parent
       }
       
       func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
           if let polyline = overlay as? MKPolyline {
               let renderer = MKPolylineRenderer(polyline: polyline)
               renderer.strokeColor = .systemBlue
               renderer.lineWidth = 3
               return renderer
           }
           return MKOverlayRenderer(overlay: overlay)
       }
       
       func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
           guard let galleryAnnotation = annotation as? GalleryAnnotation else { return nil }
           
           let identifier = "GalleryMarker"
           var view = mapView.dequeueReusableAnnotationView(withIdentifier: identifier) as? MKMarkerAnnotationView
           
           if view == nil {
               view = MKMarkerAnnotationView(annotation: annotation, reuseIdentifier: identifier)
           }
           
           view?.canShowCallout = true
           
           switch galleryAnnotation.markerType {
           case .start:
               view?.markerTintColor = .systemGreen
               view?.glyphImage = UIImage(systemName: "figure.walk")
           case .end:
               view?.markerTintColor = .systemRed
               view?.glyphImage = UIImage(systemName: "flag.fill")
           case .regular:
               view?.markerTintColor = .systemBlue
               view?.glyphImage = UIImage(systemName: "building.2.fill")
           case .waypoint:
               view?.markerTintColor = .systemBlue
               view?.glyphImage = UIImage(systemName: "circle.fill")
           }
           
           return view
       }
   }
}
